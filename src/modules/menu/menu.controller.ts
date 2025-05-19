import { Controller, Get, Param, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { QueryDto } from './dto/menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  getAll(@Query() query: QueryDto) {
    return this.menuService.findAll({
      where: {
        category: {
          id: Number(query.sub_category_id) || null,
          parent_id: Number(query.category_id) || null,
        },
      },
      relations: ['category'],
      select: ['id', 'name', 'name_en', 'image_url', 'price'],
    });
  }

  @Get('category')
  getAllCategory() {
    return this.menuService.findAllCategory({
      select: ['id', 'name', 'image_url', 'parent_id'],
      order: {
        parent_id: 'ASC',
      },
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
