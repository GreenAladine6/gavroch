// src/modules/users/dto/update-customer.dto.ts  (admin edits a customer)
import { PartialType, PickType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';

// No `role` and no `password`: forbidNonWhitelisted rejects them with a 400
export class UpdateCustomerDto extends PartialType(
  PickType(CreateAdminDto, ['email', 'firstName', 'lastName'] as const),
) {}