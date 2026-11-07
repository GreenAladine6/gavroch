// src/modules/users/dto/create-admin.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { NormalizeEmail } from '../../../shared/decorators/normalize-email.decorator';

export class CreateAdminDto {
  @ApiProperty({ example: 'manager@gavroch.com' })
  @NormalizeEmail() @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 8 })
  @IsString() @MinLength(8) @MaxLength(72)
  password!: string;

  @ApiProperty() @IsString() @MinLength(1) @MaxLength(80)
  firstName!: string;

  @ApiProperty() @IsString() @MinLength(1) @MaxLength(80)
  lastName!: string;
}