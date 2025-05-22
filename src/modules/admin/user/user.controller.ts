import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdminUserService } from './user.service';
import { UserDto } from '../../user/dto/user.dto';

@Controller('admin/user')
export class AdminUserController {
  constructor(private adminUserService: AdminUserService) {}

  @Post()
  async create(@Body() user: UserDto) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...args } = await this.adminUserService.create(user);
      return args;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists.');
      }
      throw new InternalServerErrorException();
    }
  }

  @Get()
  getAll() {
    return this.adminUserService.getAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: UserDto) {
    return this.adminUserService.update(Number(id), user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const success = await this.adminUserService.delete(Number(id));
      if (success) {
        return { success: true };
      } else {
        throw new InternalServerErrorException();
      }
    } catch (error) {
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        throw new BadRequestException("Can't delete user.");
      }
      throw new InternalServerErrorException();
    }
  }
}
