// src/modules/auth/dto/register.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { NormalizeEmail } from '../../../shared/decorators/normalize-email.decorator';

export class RegisterDto {
  @ApiProperty({ example: 'client@example.com' })
  @NormalizeEmail()
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Password123!', minLength: 8 })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password!: string;

  @ApiProperty({ example: 'Jean' })
  @IsString()
  firstName!: string;

  @ApiProperty({ example: 'Valjean' })
  @IsString()
  lastName!: string;
}