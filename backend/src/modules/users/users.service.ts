// src/modules/users/users.service.ts
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { paginated } from '../../shared/dto/pagination.dto';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { AuditAction } from '../audit-logs/audit-actions';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ListUsersQueryDto } from './dto/list-users-query.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

// The ONLY shape of a user that leaves the service: no password, no deletedAt
export const SAFE_USER_SELECT = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

type NewUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditLogsService,
  ) {}

  // ---------- lookups ----------

  /** Internal use by AuthService: includes the password hash. Never return it. */
  findAuthByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  /** Used by JwtStrategy on every request: deleted users are rejected here. */
  findActiveById(id: number) {
    return this.prisma.user.findFirst({
      where: { id, deletedAt: null },
      select: SAFE_USER_SELECT,
    });
  }

  async getOwnProfile(id: number) {
    const user = await this.findActiveById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getByIdAndRole(id: number, role: Role) {
    const user = await this.prisma.user.findFirst({
      where: { id, role, deletedAt: null },
      select: SAFE_USER_SELECT,
    });
    if (!user) throw new NotFoundException(`${role.toLowerCase()} not found`);
    return user;
  }

  async listByRole(role: Role, q: ListUsersQueryDto) {
    const where: Prisma.UserWhereInput = {
      role,
      deletedAt: null,
      ...(q.search
        ? {
            OR: [
              { email: { contains: q.search, mode: 'insensitive' } },
              { firstName: { contains: q.search, mode: 'insensitive' } },
              { lastName: { contains: q.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        select: SAFE_USER_SELECT,
        orderBy: { createdAt: 'desc' },
        skip: q.skip,
        take: q.limit,
      }),
      this.prisma.user.count({ where }),
    ]);
    return paginated(data, total, q);
  }

  // ---------- creation ----------

  /** Public registration: always CUSTOMER. The new user is its own audit actor. */
  registerCustomer(dto: NewUser) {
    return this.createUser(dto, Role.CUSTOMER, AuditAction.CUSTOMER_CREATED, null);
  }

  /** Only reachable through the admin-guarded controller. */
  createAdmin(dto: CreateAdminDto, actorId: number) {
    return this.createUser(dto, Role.ADMIN, AuditAction.ADMIN_CREATED, actorId);
  }

  private async createUser(
    dto: NewUser,
    role: Role,
    action: AuditAction,
    actorId: number | null,
  ) {
    const hashed = await bcrypt.hash(dto.password, 10);
    try {
      return await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            email: dto.email,
            password: hashed,
            firstName: dto.firstName,
            lastName: dto.lastName,
            role,
          },
          select: SAFE_USER_SELECT,
        });
        await this.audit.record(tx, {
          actorId: actorId ?? user.id,
          action,
          entityType: 'User',
          entityId: user.id,
          newValues: user,
        });
        return user;
      });
    } catch (e) {
      this.rethrowUnique(e);
    }
  }

  // ---------- updates ----------

  async updateOwnProfile(userId: number, dto: UpdateProfileDto) {
    const { currentPassword, ...changes } = dto;

    if (changes.email) {
      const current = await this.prisma.user.findFirst({
        where: { id: userId, deletedAt: null },
      });
      if (!current) throw new NotFoundException('User not found');
      // Email is a login credential, so re-check the password when it changes
      if (changes.email !== current.email) {
        const ok =
          !!currentPassword &&
          (await bcrypt.compare(currentPassword, current.password));
        if (!ok) {
          throw new UnauthorizedException(
            'Current password is required to change your email',
          );
        }
      }
    }
    return this.applyUpdate(userId, changes, userId, AuditAction.PROFILE_UPDATED);
  }

  async updateCustomerByAdmin(id: number, dto: UpdateCustomerDto, actorId: number) {
    await this.assertIsActiveCustomer(id);
    return this.applyUpdate(
      id,
      dto,
      actorId,
      AuditAction.CUSTOMER_UPDATED_BY_ADMIN,
      Role.CUSTOMER,
    );
  }

  private async applyUpdate(
    id: number,
    data: UpdateCustomerDto,
    actorId: number,
    action: AuditAction,
    requiredRole?: Role,
  ) {
    if (Object.keys(data).length === 0) {
      throw new BadRequestException('Nothing to update');
    }
    const where: Prisma.UserWhereInput = {
      id,
      deletedAt: null,
      ...(requiredRole ? { role: requiredRole } : {}),
    };
    try {
      return await this.prisma.$transaction(async (tx) => {
        const before = await tx.user.findFirst({ where, select: SAFE_USER_SELECT });
        if (!before) throw new NotFoundException('User not found');

        const after = await tx.user.update({
          where: { id },
          data, // DTO has no role/password, so those can't be changed here
          select: SAFE_USER_SELECT,
        });
        await this.audit.record(tx, {
          actorId,
          action,
          entityType: 'User',
          entityId: id,
          oldValues: before,
          newValues: after,
        });
        return after;
      });
    } catch (e) {
      this.rethrowUnique(e);
    }
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId, deletedAt: null },
    });
    if (!user) throw new NotFoundException('User not found');

    if (!(await bcrypt.compare(dto.currentPassword, user.password))) {
      throw new UnauthorizedException('Current password is incorrect');
    }
    if (dto.currentPassword === dto.newPassword) {
      throw new BadRequestException('New password must be different');
    }

    const hashed = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.$transaction(async (tx) => {
      await tx.user.update({ where: { id: userId }, data: { password: hashed } });
      // Event only: no old or new values, never any password material
      await this.audit.record(tx, {
        actorId: userId,
        action: AuditAction.PASSWORD_CHANGED,
        entityType: 'User',
        entityId: userId,
      });
    });
  }

  // ---------- deletion ----------

  async softDeleteCustomer(id: number, actorId: number) {
    const target = await this.prisma.user.findFirst({
      where: { id, deletedAt: null },
      select: SAFE_USER_SELECT,
    });
    if (!target) throw new NotFoundException('Customer not found');
    if (target.role === Role.ADMIN) {
      throw new ForbiddenException('Administrators cannot be deleted');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.user.update({ where: { id }, data: { deletedAt: new Date() } });
      await this.audit.record(tx, {
        actorId,
        action: AuditAction.CUSTOMER_DELETED,
        entityType: 'User',
        entityId: id,
        oldValues: target,
      });
    });
  }

  // ---------- helpers ----------

  private async assertIsActiveCustomer(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id, deletedAt: null },
      select: { role: true },
    });
    if (!user) throw new NotFoundException('Customer not found');
    if (user.role !== Role.CUSTOMER) {
      throw new ForbiddenException('Administrator accounts cannot be edited here');
    }
  }

  private rethrowUnique(e: unknown): never {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      throw new ConflictException('Email already in use');
    }
    throw e;
  }
}