// src/modules/products/pricing.ts
import { Prisma } from '@prisma/client';

// THINK: money is NEVER a JS number (0.1 + 0.2 !== 0.3).
// Prisma.Decimal does exact decimal arithmetic.
// This is the ONLY place where "final price" is calculated.
// Products use it to display prices, Orders use it to charge them.
export function computeFinalPrice(
  price: Prisma.Decimal,
  discount: boolean,
  discountPercentage: Prisma.Decimal | null,
): Prisma.Decimal {
  if (!discount || !discountPercentage) return price;

  // price * (100 - pct) / 100, rounded to 2 decimals
  const factor = new Prisma.Decimal(100).minus(discountPercentage).div(100);
  return price.mul(factor).toDecimalPlaces(2);
}