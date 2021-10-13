import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, LoginInfo } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() data: LoginInfo) {
    return this.authService.login(data);
  }
}
