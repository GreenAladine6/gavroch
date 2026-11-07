// src/modules/users/dto/update-profile.dto.ts  (own profile)
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UpdateCustomerDto } from './update-customer.dto';

export class UpdateProfileDto extends UpdateCustomerDto {
  @ApiPropertyOptional({ description: 'Required only when changing the email' })
  @IsOptional() @IsString()
  currentPassword?: string;
}