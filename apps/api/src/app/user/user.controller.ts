import { UserEntity } from '@merp/entities';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getData() {
    return this.userService.getData();
  }

  @Post()
  saveUser(
    @Body() data: Partial<UserEntity>
  ) {
    return this.userService.saveUser(data);
  }
}
