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
      relations: ['options', 'options.option', 'options.option.choices'],
      select: {
        id: true,
        name: true,
        name_en: true,
        description: true,
        image_url: true,
        price: true,
        options: {
          menu_id: true,
          option_id: true,
          option: {
            id: true,
            name: true,
            is_required: true,
            allow_multiple: true,
            choices: {
              id: true,
              name: true,
              additional_price: true,
            },
          },
        },
      },
      order: {
        options: {
          option: {
            allow_multiple: 'ASC',
            choices: {
              additional_price: 'ASC',
            },
          },
        },
      },
    });
  }
}
