// src/modules/products/dto/category.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Desserts' })
  @IsString() @MinLength(2) @MaxLength(60)
  name!: string;
  // No `slug` field: the backend derives it from the name. One source of truth.
}

export class UpdateCategoryDto extends CreateCategoryDto {}