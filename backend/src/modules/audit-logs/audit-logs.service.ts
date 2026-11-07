// src/modules/audit-logs/audit-logs.service.ts
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { AuditAction } from './audit-actions';
import { ListAuditLogsQueryDto } from './dto/list-audit-logs-query.dto';
import { paginated } from '../../shared/dto/pagination.dto';

type AuditClient = Prisma.TransactionClient | PrismaService;

interface AuditEntry {
  actorId: number;
  action: AuditAction;
  entityType: string;
  entityId?: number;
  oldValues?: object;
  newValues?: object;
}

// Safety net: even if a caller passes a full user row, secrets are dropped
function stripSensitive(values?: object): Prisma.InputJsonValue | undefined {
  if (!values) return undefined;
  const { password, ...safe } = values as Record<string, unknown>;
  return JSON.parse(JSON.stringify(safe)); // also converts Dates/Decimals
}

@Injectable()
export class AuditLogsService {
  constructor(private readonly prisma: PrismaService) {}

  // Pass the `tx` from prisma.$transaction so the log commits with the change
  record(client: AuditClient, entry: AuditEntry) {
    return client.auditLog.create({
      data: {
        actorId: entry.actorId,
        action: entry.action,
        entityType: entry.entityType,
        entityId: entry.entityId,
        oldValues: stripSensitive(entry.oldValues),
        newValues: stripSensitive(entry.newValues),
      },
    });
  }

  async list(q: ListAuditLogsQueryDto) {
    const where: Prisma.AuditLogWhereInput = {
      actorId: q.actorId,
      action: q.action,
      entityType: q.entityType,
      entityId: q.entityId,
    };
    const [data, total] = await this.prisma.$transaction([
      this.prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: q.skip,
        take: q.limit,
      }),
      this.prisma.auditLog.count({ where }),
    ]);
    return paginated(data, total, q);
  }
}