// src/modules/products/products.module.ts
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { AdminProductsController } from './admin-products.controller';
import { AdminCategoriesController, CategoriesController } from './categories.controller';
import { ProductsService } from './products.service';
import { CategoriesService } from './categories.service';

@Module({
  controllers: [
    ProductsController, AdminProductsController,
    CategoriesController, AdminCategoriesController,
  ],
  providers: [ProductsService, CategoriesService],
})
export class ProductsModule {}