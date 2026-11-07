// src/modules/products/dto/create-product.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize, IsArray, IsBoolean, IsInt, IsNumber,
  IsOptional, IsString, Max, MaxLength, Min, MinLength,
} from 'class-validator';

// THINK: this DTO answers "what is the client ALLOWED to send?"
// Notice what is missing: finalPrice, id, createdAt, deletedAt.
// With whitelist + forbidNonWhitelisted, sending them gives a 400.
export class CreateProductDto {
  @ApiProperty({ example: 'Tarte au citron' })
  @IsString() @MinLength(2) @MaxLength(120)
  name!: string;

  @ApiProperty()
  @IsString() @MinLength(1) @MaxLength(2000)
  description!: string;

  // maxDecimalPlaces: 2 rejects 12.999. Min stops 0 and negative prices.
  @ApiProperty({ example: 12.5 })
  @IsNumber({ maxDecimalPlaces: 2 }) @Min(0.01) @Max(100000)
  price!: number;

  @ApiPropertyOptional({ type: [String], example: ['/uploads/tarte.jpg'] })
  @IsOptional() @IsArray() @ArrayMaxSize(10) @IsString({ each: true })
  images?: string[];

  @ApiProperty({ example: 25 })
  @IsInt() @Min(0) @Max(1_000_000)
  stock!: number;

  @ApiPropertyOptional({ default: false })
  @IsOptional() @IsBoolean()
  discount?: boolean;

  // Only the RANGE is checked here. The rule "required when discount=true"
  // involves two fields (and on update, the stored value), so it lives in
  // the service where we can see everything.
  @ApiPropertyOptional({ example: 15, nullable: true })
  @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0.01) @Max(100)
  discountPercentage?: number | null;

  @ApiPropertyOptional({ default: false })
  @IsOptional() @IsBoolean()
  popularity?: boolean;

  @ApiProperty({ example: 1 })
  @IsInt() @Min(1)
  categoryId!: number;
}