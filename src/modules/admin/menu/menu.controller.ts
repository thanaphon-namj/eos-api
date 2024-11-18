import { Body, Controller, Post } from '@nestjs/common';
import { AdminMenuService } from './menu.service';

@Controller('admin/menu')
export class AdminMenuController {
  constructor(private adminMenuService: AdminMenuService) {}

  @Post('category')
  createCategory(@Body() category: any) {
    return this.adminMenuService.createCategory(category);
  }
}
