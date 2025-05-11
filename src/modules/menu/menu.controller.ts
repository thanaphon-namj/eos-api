import { Controller, Get, Param } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  getAll() {
    return this.menuService.findAll({
      where: {
        is_active: true,
      },
      relations: ['category'],
      select: ['id', 'name', 'image_url', 'price'],
      order: {
        category: {
          priority: 'ASC',
        },
      },
    });
  }

  @Get('category')
  getAllCategory() {
    return this.menuService.findAllCategory({
      select: ['id', 'name'],
      order: {
        priority: 'ASC',
      },
    });
  }

  @Get('recommended')
  getAllRecommended() {
    return this.menuService.findAll({
      where: {
        is_active: true,
        is_recommended: true,
      },
      relations: ['category'],
      select: {
        id: true,
        name: true,
        name_en: true,
        image_url: true,
        price: true,
        category: {
          id: true,
          name: true,
        },
      },
      order: {
        category: {
          priority: 'ASC',
        },
      },
    });
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const menu = await this.menuService.findOne({
      where: {
        id: Number(id),
      },
      relations: ['options'],
      select: ['id', 'name', 'name_en', 'description', 'price'],
      // order: {
      //   options: {
      //     group_name: 'DESC',
      //     additional_price: 'ASC',
      //   },
      // },
    });
    return {
      ...menu,
      // options: menu.options.filter((option) => option.is_active),
    };
  }
}
