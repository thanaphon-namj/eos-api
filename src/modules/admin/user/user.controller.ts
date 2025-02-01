import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdminUserService } from './user.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';

@Controller('admin/user')
export class AdminUserController {
  constructor(private adminUserService: AdminUserService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.adminUserService.create(user);
  }

  @Get()
  getAll() {
    return this.adminUserService.getAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: CreateUserDto) {
    try {
      await this.adminUserService.update(+id, user);
      return { success: true };
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.adminUserService.delete(+id);
      return { success: true };
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
