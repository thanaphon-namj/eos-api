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
import { AdminMenuService } from './menu.service';

@Controller('admin/menu')
export class AdminMenuController {
  constructor(private adminMenuService: AdminMenuService) {}

  @Post()
  create(@Body() menu: any) {
    return this.adminMenuService.create(menu);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() menu: any) {
    return this.adminMenuService.update(+id, menu);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.adminMenuService.delete(+id);
      return { success: true };
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Post('category')
  createCategory(@Body() category: any) {
    return this.adminMenuService.createCategory(category);
  }

  @Get('category')
  getAllCategory() {
    return this.adminMenuService.getAllCategory();
  }

  @Put('category/:id')
  async updateCategory(@Param('id') id: string, @Body() category: any) {
    try {
      await this.adminMenuService.updateCategory(+id, category);
      return { success: true };
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Delete('category/:id')
  async deleteCategory(@Param('id') id: string) {
    try {
      await this.adminMenuService.deleteCategory(+id);
      return { success: true };
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
