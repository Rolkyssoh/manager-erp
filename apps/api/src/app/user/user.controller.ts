import { UserEntity } from '@merp/entities';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.decorator';
import { RoleValidationGuard } from '../auth/role-validation.guard';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @UseGuards(
    AuthGuard(),
    new RoleValidationGuard()
  )
  getUsers(
    @User() user: UserEntity
  ) {
    return this.userService.getUsers();
  }

  @Post()
  saveUser(
    @Body() data: Partial<UserEntity>,
  ) {
    return this.userService.saveUser(data);
  }
}
