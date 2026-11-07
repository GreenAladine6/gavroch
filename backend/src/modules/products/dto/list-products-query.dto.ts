// src/modules/products/dto/list-products-query.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PaginationDto } from '../../../shared/dto/pagination.dto';

// PITFALL: query strings are always text. `@Type(() => Boolean)` turns the text
// "false" into true (any non-empty string is truthy), so we convert by hand.
const toBoolean = ({ value }: { value: unknown }) =>
  value === 'true' ? true : value === 'false' ? false : value;

export class ListProductsQueryDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Searches name and description' })
  @IsOptional() @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 'desserts' })
  @IsOptional() @IsString()
  categorySlug?: string;

  @ApiPropertyOptional() @IsOptional() @Transform(toBoolean) @IsBoolean()
  discounted?: boolean;

  @ApiPropertyOptional() @IsOptional() @Transform(toBoolean) @IsBoolean()
  popular?: boolean;

  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() @Min(0)
  minPrice?: number;

  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber() @Min(0)
  maxPrice?: number;

  // Whitelist of sortable fields. NEVER pass a client string straight into orderBy.
  @ApiPropertyOptional({ enum: ['createdAt', 'price', 'name'], default: 'createdAt' })
  @IsOptional() @IsIn(['createdAt', 'price', 'name'])
  sortBy: 'createdAt' | 'price' | 'name' = 'createdAt';

  @ApiPropertyOptional({ enum: ['asc', 'desc'], default: 'desc' })
  @IsOptional() @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc' = 'desc';
}