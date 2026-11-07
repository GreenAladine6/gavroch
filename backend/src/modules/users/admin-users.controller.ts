// src/modules/users/admin-users.controller.ts  (replaces the placeholder controller)
import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { AuthUser, CurrentUser } from '../../shared/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ListUsersQueryDto } from './dto/list-users-query.dto';

@ApiTags('Admin - Users')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminUsersController {
  constructor(private readonly users: UsersService) {}

  @Post('admins')
  @ApiOperation({ summary: 'Create an administrator' })
  createAdmin(@CurrentUser() actor: AuthUser, @Body() dto: CreateAdminDto) {
    return this.users.createAdmin(dto, actor.id);
  }

  @Get('admins')
  @ApiOperation({ summary: 'List administrators' })
  listAdmins(@Query() q: ListUsersQueryDto) {
    return this.users.listByRole(Role.ADMIN, q);
  }

  @Get('admins/:id')
  @ApiOperation({ summary: 'Administrator details' })
  getAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.users.getByIdAndRole(id, Role.ADMIN);
  }

  @Get('customers')
  @ApiOperation({ summary: 'List customers' })
  listCustomers(@Query() q: ListUsersQueryDto) {
    return this.users.listByRole(Role.CUSTOMER, q);
  }

  @Get('customers/:id')
  @ApiOperation({ summary: 'Customer details' })
  getCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.users.getByIdAndRole(id, Role.CUSTOMER);
  }

  @Patch('customers/:id')
  @ApiOperation({ summary: 'Update a customer (no role or password changes)' })
  updateCustomer(
    @CurrentUser() actor: AuthUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.users.updateCustomerByAdmin(id, dto, actor.id);
  }

  @Delete('customers/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft-delete a customer (admins cannot be deleted)' })
  async deleteCustomer(
    @CurrentUser() actor: AuthUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.users.softDeleteCustomer(id, actor.id);
  }
}