// src/modules/audit-logs/audit-logs.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { AuditLogsService } from './audit-logs.service';
import { ListAuditLogsQueryDto } from './dto/list-audit-logs-query.dto';

@ApiTags('Admin - Audit logs')
@ApiBearerAuth()
@Controller('admin/audit-logs')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AuditLogsController {
  constructor(private readonly auditLogs: AuditLogsService) {}

  @Get()
  @ApiOperation({ summary: 'List audit logs (read-only)' })
  list(@Query() query: ListAuditLogsQueryDto) {
    return this.auditLogs.list(query);
  }
}