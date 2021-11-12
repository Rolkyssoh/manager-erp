import { LoginDtoOut } from '@merp/dto';
import { UserEntity } from '@merp/entities';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService, LoginInfo } from './auth.service';

@Controller('/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginInfo) {
    return this.authService.login(data);
  }

  @Post('register')
  async signUp(@Body() data: Partial<UserEntity>) {
    return this.authService.signUp(data);
  }
}
