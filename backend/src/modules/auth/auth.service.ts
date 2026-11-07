// src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.users.registerCustomer(dto); // always CUSTOMER
    return this.buildAuthResponse(user);
  }

  async login(dto: LoginDto) {
    const user = await this.users.findAuthByEmail(dto.email);
    const valid =
      !!user && !user.deletedAt && (await bcrypt.compare(dto.password, user.password));
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const { password, deletedAt, ...safe } = user;
    return this.buildAuthResponse(safe);
  }

  private buildAuthResponse(user: {
    id: number; email: string; role: string; firstName: string; lastName: string;
  }) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwt.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }
}