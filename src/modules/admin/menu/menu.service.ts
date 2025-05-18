import { Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import { MenuService } from '../../menu/menu.service';
import { MenuDto } from '../../menu/dto/menu.dto';
import { OptionDto } from '../../menu/dto/option.dto';
import { CategoryDto } from '../../menu/dto/category.dto';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class AdminMenuService {
  constructor(private menuService: MenuService) {}

  create(menu: MenuDto) {
    return this.menuService.create(menu);
  }

  getAll(query: QueryDto) {
    const where = {
      category: {
        parent_id: query.category_id,
      },
    };
    if (query.q) {
      where['name'] = Like(`%${query.q}%`);
    }
    return this.menuService.findAll({
      where,
      select: ['id', 'name', 'image_url'],
    });
  }

  getById(id: number) {
    return this.menuService.findOne({
      where: { id },
      relations: ['category', 'category.parent', 'options.option.choices'],
      select: {
        id: true,
        name: true,
        name_en: true,
        description: true,
        image_url: true,
        price: true,
        status: true,
        is_recommended: true,
        category: {
          id: true,
          name: true,
          parent: {
            id: true,
            name: true,
          },
        },
        options: {
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
            choices: {
              additional_price: 'ASC',
            },
          },
        },
      },
    });
  }

  update(id: number, menu: MenuDto): Promise<boolean> {
    return this.menuService.update(id, menu);
  }

  delete(id: number): Promise<boolean> {
    return this.menuService.delete(id);
  }

  createOption(option: OptionDto) {
    return this.menuService.createOption(option);
  }

  getAllOption() {
    return this.menuService.findAllOption({
      relations: ['choices'],
      select: {
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
      order: {
        id: 'ASC',
        choices: {
          additional_price: 'ASC',
        },
      },
    });
  }

  updateOption(id: number, option: OptionDto): Promise<boolean> {
    return this.menuService.updateOption(id, option);
  }

  deleteOption(id: number): Promise<boolean> {
    return this.menuService.deleteOption(id);
  }

  createCategory(category: CategoryDto) {
    return this.menuService.createCategory(category);
  }

  getAllCategory() {
    return this.menuService.findAllCategory({
      select: ['id', 'name', 'image_url', 'parent_id'],
      order: {
        parent_id: 'ASC',
      },
    });
  }

  updateCategory(id: number, category: CategoryDto): Promise<boolean> {
    return this.menuService.updateCategory(id, category);
  }

  deleteCategory(id: number): Promise<boolean> {
    return this.menuService.deleteCategory(id);
  }
}
