import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AdminAuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  @Post('login')
  login(@Body() login: LoginDto) {
    return this.adminAuthService.login(login.username, login.password);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@Request() req: any) {
    return this.adminAuthService.getUser(req.user.sub);
  }
}
