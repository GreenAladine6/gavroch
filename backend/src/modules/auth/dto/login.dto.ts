// src/modules/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Max, MaxLength, MinLength } from 'class-validator';
import { NormalizeEmail } from '../../../shared/decorators/normalize-email.decorator';


export class LoginDto {
  @ApiProperty({ example: 'admin@gavroch.com' })
  @NormalizeEmail()
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Admin1234!', minLength: 8 })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password!: string;
}