// src/modules/audit-logs/dto/list-audit-logs-query.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../shared/dto/pagination.dto';

export class ListAuditLogsQueryDto extends PaginationDto {
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsInt()
  actorId?: number;

  @ApiPropertyOptional({ example: 'CUSTOMER_DELETED' }) @IsOptional() @IsString()
  action?: string;

  @ApiPropertyOptional({ example: 'User' }) @IsOptional() @IsString()
  entityType?: string;

  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsInt()
  entityId?: number;
}