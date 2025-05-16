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
import { MenuDto } from '../../menu/dto/menu.dto';
import { OptionDto } from '../../menu/dto/option.dto';
import { CategoryDto } from '../../menu/dto/category.dto';
import { QueryDto } from './dto/query.dto';
import { ReorderCategoryDto } from './dto/category.dto';

@Controller('admin/menu')
export class AdminMenuController {
  constructor(private adminMenuService: AdminMenuService) {}

  @Post()
  create(@Body() menu: MenuDto) {
    return this.adminMenuService.create(menu);
  }

  @Get()
  getAll(@Query() query: QueryDto) {
    return this.adminMenuService.getAll(query);
  }

  @Get('option')
  getAllOption() {
    return this.adminMenuService.getAllOption();
  }

  @Get('category')
  getAllCategory() {
    return this.adminMenuService.getAllCategory();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.adminMenuService.getById(Number(id));
  }

  @Put('category')
  async reorderCategory(@Body() reorderCategory: ReorderCategoryDto) {
    const success = await this.adminMenuService.reorderCategory(
      reorderCategory.categories,
    );
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() menu: MenuDto) {
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
  createOption(@Body() option: OptionDto) {
    return this.adminMenuService.createOption(option);
  }

  @Put('option/:id')
  async updateOption(@Param('id') id: string, @Body() option: OptionDto) {
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
  createCategory(@Body() category: CategoryDto) {
    return this.adminMenuService.createCategory(category);
  }

  @Put('category/:id')
  async updateCategory(@Param('id') id: string, @Body() category: CategoryDto) {
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
