// src/modules/users/dto/list-users-query.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../shared/dto/pagination.dto';

export class ListUsersQueryDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Matches email, first or last name' })
  @IsOptional() @IsString()
  search?: string;
}