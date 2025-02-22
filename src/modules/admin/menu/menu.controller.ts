import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AdminMenuService } from './menu.service';
import { QueryMenuDto } from './dto/menu.dto';

@Controller('admin/menu')
export class AdminMenuController {
  constructor(private adminMenuService: AdminMenuService) {}

  @Post()
  create(@Body() menu: any) {
    return this.adminMenuService.create(menu);
  }

  @Get()
  getAll(@Query() queryDto: QueryMenuDto) {
    return this.adminMenuService.getAll(queryDto);
  }

  @Get('category')
  getAllCategory() {
    return this.adminMenuService.getAllCategory();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.adminMenuService.getById(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() menu: any) {
    const success = await this.adminMenuService.update(Number(id), menu);
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const success = await this.adminMenuService.delete(Number(id));
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Post('option')
  createOption(@Body() option: any) {
    return this.adminMenuService.createOption(option);
  }

  @Put('option/:id')
  async updateOption(@Param('id') id: string, @Body() option: any) {
    const success = await this.adminMenuService.updateOption(
      Number(id),
      option,
    );
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Delete('option/:id')
  async deleteOption(@Param('id') id: string) {
    const success = await this.adminMenuService.deleteOption(Number(id));
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Post('category')
  createCategory(@Body() category: any) {
    return this.adminMenuService.createCategory(category);
  }

  @Put('category/:id')
  async updateCategory(@Param('id') id: string, @Body() category: any) {
    const success = await this.adminMenuService.updateCategory(
      Number(id),
      category,
    );
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Delete('category/:id')
  async deleteCategory(@Param('id') id: string) {
    const success = await this.adminMenuService.deleteCategory(Number(id));
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }
}
