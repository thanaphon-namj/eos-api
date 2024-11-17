import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() login: LoginDto) {
    return this.authService.login(login.username, login.password);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@Request() req: any) {
    return req.user;
  }
}
