// src/modules/products/products.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { paginated } from '../../shared/dto/pagination.dto';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { AuditAction } from '../audit-logs/audit-actions';
import { computeFinalPrice } from './pricing';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ListProductsQueryDto } from './dto/list-products-query.dto';

/*
 * RULES (write these first, then code them):
 *  - Only admins create / update / delete products (enforced in the controller).
 *  - discount=false -> discountPercentage is forced to null.
 *  - discount=true  -> discountPercentage must be between 0 and 100.
 *  - finalPrice is always computed here, never accepted from the client.
 *  - Delete is a SOFT delete, because old orders still point to the product.
 *  - Every write is audited in the same transaction.
 */

const PRODUCT_INCLUDE = {
  category: { select: { id: true, name: true, slug: true } },
} satisfies Prisma.ProductInclude;

type ProductRow = Prisma.ProductGetPayload<{ include: typeof PRODUCT_INCLUDE }>;

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditLogsService,
  ) {}

  // ---------- reads (public catalog + admin) ----------

  async list(q: ListProductsQueryDto) {
    // THINK: build `where` piece by piece. A filter only applies if the client sent it.
    const where: Prisma.ProductWhereInput = {
      deletedAt: null, // soft-deleted products never appear in the catalog
      ...(q.categorySlug ? { category: { slug: q.categorySlug } } : {}),
      ...(q.discounted !== undefined ? { discount: q.discounted } : {}),
      ...(q.popular !== undefined ? { popularity: q.popular } : {}),
      // Prisma ignores `undefined` values, so this is safe when only one bound is sent
      ...(q.minPrice !== undefined || q.maxPrice !== undefined
        ? { price: { gte: q.minPrice, lte: q.maxPrice } }
        : {}),
      ...(q.search
        ? {
            OR: [
              { name: { contains: q.search, mode: 'insensitive' } },
              { description: { contains: q.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    // Sort by the chosen field, then by id so pages are stable (no duplicates across pages)
    const primary: Prisma.ProductOrderByWithRelationInput =
      q.sortBy === 'price' ? { price: q.order }
      : q.sortBy === 'name' ? { name: q.order }
      : { createdAt: q.order };

    // $transaction([...]) runs both queries on one connection: same snapshot
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        include: PRODUCT_INCLUDE,
        orderBy: [primary, { id: 'asc' }],
        skip: q.skip,
        take: q.limit,
      }),
      this.prisma.product.count({ where }),
    ]);
    return paginated(rows.map((p) => this.toView(p)), total, q);
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findFirst({
      where: { id, deletedAt: null },
      include: PRODUCT_INCLUDE,
    });
    if (!product) throw new NotFoundException('Product not found');
    return this.toView(product);
  }

  // ---------- writes (admin only) ----------

  async create(dto: CreateProductDto, actorId: number) {
    // STEP 1: does the category exist? (friendlier than a raw foreign-key error)
    await this.assertCategoryExists(dto.categoryId);

    // STEP 2: business rule on discounts
    const discount = dto.discount ?? false;
    const discountPercentage = this.resolveDiscount(discount, dto.discountPercentage);

    // STEP 3/4: write + audit in ONE transaction: both succeed or both roll back
    const created = await this.prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: { ...dto, images: dto.images ?? [], discount, discountPercentage },
        include: PRODUCT_INCLUDE,
      });
      await this.audit.record(tx, {
        actorId, // from the JWT, passed down by the controller
        action: AuditAction.PRODUCT_CREATED,
        entityType: 'Product',
        entityId: product.id,
        newValues: product,
      });
      return product;
    });

    // STEP 5: return a safe shape
    return this.toView(created);
  }

  async update(id: number, dto: UpdateProductDto, actorId: number) {
    if (dto.categoryId !== undefined) await this.assertCategoryExists(dto.categoryId);

    const updated = await this.prisma.$transaction(async (tx) => {
      // Read the "before" INSIDE the transaction: it is what the audit log will store
      const before = await tx.product.findFirst({ where: { id, deletedAt: null } });
      if (!before) throw new NotFoundException('Product not found');

      // PATCH only sends some fields, so merge with what is stored:
      // "what will the product look like AFTER this update?" and validate THAT.
      const discount = dto.discount ?? before.discount;
      const requestedPct =
        dto.discountPercentage !== undefined
          ? dto.discountPercentage
          : before.discountPercentage?.toNumber() ?? null;
      const discountPercentage = this.resolveDiscount(discount, requestedPct);

      const after = await tx.product.update({
        where: { id },
        data: { ...dto, discount, discountPercentage },
        include: PRODUCT_INCLUDE,
      });
      await this.audit.record(tx, {
        actorId,
        action: AuditAction.PRODUCT_UPDATED,
        entityType: 'Product',
        entityId: id,
        oldValues: before,
        newValues: after,
      });
      return after;
    });
    return this.toView(updated);
  }

  async remove(id: number, actorId: number) {
    await this.prisma.$transaction(async (tx) => {
      const before = await tx.product.findFirst({ where: { id, deletedAt: null } });
      if (!before) throw new NotFoundException('Product not found');

      // SOFT delete: the row stays, so OrderItem.productId keeps pointing to something real
      await tx.product.update({ where: { id }, data: { deletedAt: new Date() } });
      await this.audit.record(tx, {
        actorId,
        action: AuditAction.PRODUCT_DELETED,
        entityType: 'Product',
        entityId: id,
        oldValues: before,
      });
    });
  }

  // ---------- helpers ----------

  /** The single place where the discount rule lives. */
  private resolveDiscount(discount: boolean, pct: number | null | undefined): number | null {
    if (!discount) return null; // no discount -> the percentage is forced to null
    if (pct == null || pct <= 0 || pct > 100) {
      throw new BadRequestException(
        'discountPercentage must be between 0 and 100 when discount is true',
      );
    }
    return pct;
  }

  private async assertCategoryExists(categoryId: number) {
    const found = await this.prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true },
    });
    if (!found) throw new BadRequestException('Category does not exist');
  }

  /** Output shape: hides deletedAt, adds the computed finalPrice. */
  private toView(p: ProductRow) {
    const { deletedAt, ...rest } = p;
    return {
      ...rest,
      finalPrice: computeFinalPrice(p.price, p.discount, p.discountPercentage),
    };
  }
}