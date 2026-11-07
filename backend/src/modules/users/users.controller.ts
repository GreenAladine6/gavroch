// src/modules/users/users.controller.ts  (any authenticated user: own account)
import { Body, Controller, Get, HttpCode, HttpStatus, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { AuthUser, CurrentUser } from '../../shared/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('Users - My account')
@ApiBearerAuth()
@Controller('users/me')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get my profile' })
  getMe(@CurrentUser() user: AuthUser) {
    return this.users.getOwnProfile(user.id);
  }

  @Patch()
  @ApiOperation({ summary: 'Update my profile (email change needs currentPassword)' })
  updateMe(@CurrentUser() user: AuthUser, @Body() dto: UpdateProfileDto) {
    return this.users.updateOwnProfile(user.id, dto);
  }

  @Patch('password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Change my password' })
  async changePassword(@CurrentUser() user: AuthUser, @Body() dto: ChangePasswordDto) {
    await this.users.changePassword(user.id, dto);
  }
}