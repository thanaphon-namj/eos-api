import {
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { AdminMenuService } from './menu.service';

@Controller('admin/menu')
export class AdminMenuController {
  constructor(private adminMenuService: AdminMenuService) {}

  @Post('category')
  createCategory(@Body() category: any) {
    return this.adminMenuService.createCategory(category);
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
