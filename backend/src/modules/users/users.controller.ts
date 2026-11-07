// src/modules/users/users.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';

@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard) // order matters: authenticate first, then check role
@Roles('ADMIN')
export class AdminUsersController {
  @Get()
  listUsers() {
    return 'Only admins see this';
  }
}