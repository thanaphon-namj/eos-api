import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AdminDto } from './dto/admin.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() admin: AdminDto) {
    return this.userService.create(admin);
  }
}
