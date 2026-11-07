// src/modules/products/products.controller.ts   (PUBLIC: no guard, anyone can browse)
import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ListProductsQueryDto } from './dto/list-products-query.dto';

@ApiTags('Catalog')
@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Browse: ?search= &categorySlug= &discounted=true &popular=true &sortBy= &order= &page= &limit=' })
  list(@Query() q: ListProductsQueryDto) {
    return this.products.list(q);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.products.findOne(id);
  }
}