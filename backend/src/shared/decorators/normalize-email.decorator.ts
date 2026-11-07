// src/shared/decorators/normalize-email.decorator.ts
import { Transform } from 'class-transformer';

export const NormalizeEmail = () =>
  Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  );