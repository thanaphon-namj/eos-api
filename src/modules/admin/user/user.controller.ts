import { Body, Controller, Post } from '@nestjs/common';
import { AdminUserService } from './user.service';
import { UserDto } from '../../user/dto/user.dto';

@Controller('admin/user')
export class AdminUserController {
  constructor(private adminUserService: AdminUserService) {}

  @Post()
  async create(@Body() user: UserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...args } = await this.adminUserService.create(user);
    return args;
  }
}
