import { Controller, Get, Param } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  getAll() {
    return this.menuService.findAll({
      relations: ['category'],
      select: ['id', 'name', 'image_url', 'price'],
    });
  }

  @Get('category')
  getAllCategory() {
    return this.menuService.findAllCategory({
      select: ['id', 'name'],
    });
  }

  @Get('recommended')
  getAllRecommended() {
    return this.menuService.findAll({
      where: {
        is_recommended: true,
      },
      relations: ['category', 'category.parent'],
      select: {
        id: true,
        name: true,
        name_en: true,
        image_url: true,
        price: true,
        category: {
          id: true,
          name: true,
          parent: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.menuService.findOne({
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
  }
}
