// src/modules/products/admin-products.controller.ts
import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { AuthUser, CurrentUser } from '../../shared/decorators/current-user.decorator';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ListProductsQueryDto } from './dto/list-products-query.dto';

// THINK: a controller only does three things: guard, extract the data from the
// request (body, params, user), call ONE service method. No business logic here.
@ApiTags('Admin - Products')
@ApiBearerAuth()
@Controller('admin/products')
@UseGuards(JwtAuthGuard, RolesGuard) // order matters: who are you? then are you allowed?
@Roles('ADMIN')
export class AdminProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  list(@Query() q: ListProductsQueryDto) {
    return this.products.list(q);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.products.findOne(id);
  }

  @Post()
  create(@CurrentUser() actor: AuthUser, @Body() dto: CreateProductDto) {
    return this.products.create(dto, actor.id);
  }

  @Patch(':id')
  update(
    @CurrentUser() actor: AuthUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.products.update(id, dto, actor.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@CurrentUser() actor: AuthUser, @Param('id', ParseIntPipe) id: number) {
    await this.products.remove(id, actor.id);
  }
}