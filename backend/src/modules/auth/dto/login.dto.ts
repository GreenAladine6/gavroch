// src/modules/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@gavroch.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Admin1234!', minLength: 8 })
  @IsString()
  @MinLength(8)
  password!: string;
}