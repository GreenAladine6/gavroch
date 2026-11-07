// src/modules/products/dto/update-product.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

// PATCH = partial update: same fields, all optional, same validation rules.
export class UpdateProductDto extends PartialType(CreateProductDto) {}