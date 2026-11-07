// src/shared/dto/pagination.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ default: 20, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 20;

  get skip() {
    return (this.page - 1) * this.limit;
  }
}

export function paginated<T>(
  data: T[],
  total: number,
  { page, limit }: { page: number; limit: number },
) {
  return {
    data,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  };
}