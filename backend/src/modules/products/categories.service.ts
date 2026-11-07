// src/modules/products/categories.service.ts
import {
  BadRequestException, ConflictException, Injectable, NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { slugify } from '../../shared/utils/slugify';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.category.findMany({ orderBy: { name: 'asc' } });
  }

  async create(dto: CreateCategoryDto) {
    try {
      return await this.prisma.category.create({ data: this.build(dto) });
    } catch (e) {
      this.translate(e);
    }
  }

  async update(id: number, dto: UpdateCategoryDto) {
    try {
      return await this.prisma.category.update({ where: { id }, data: this.build(dto) });
    } catch (e) {
      this.translate(e);
    }
  }

  async remove(id: number) {
    // STEP 2: business rule. Products (even soft-deleted ones) still point to
    // this category, so removing it would break history. The DB would refuse
    // anyway (onDelete: Restrict), but a friendly message is better than a 500.
    const used = await this.prisma.product.count({ where: { categoryId: id } });
    if (used > 0) {
      throw new ConflictException('Category still has products, move or delete them first');
    }
    try {
      await this.prisma.category.delete({ where: { id } });
    } catch (e) {
      this.translate(e);
    }
  }

  private build(dto: CreateCategoryDto) {
    const name = dto.name.trim();
    const slug = slugify(name);
    if (!slug) throw new BadRequestException('Name must contain letters or digits');
    return { name, slug };
  }

  // Turn database error codes into proper HTTP errors
  private translate(e: unknown): never {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') throw new ConflictException('Category already exists'); // unique
      if (e.code === 'P2025') throw new NotFoundException('Category not found');      // no row
    }
    throw e;
  }
}