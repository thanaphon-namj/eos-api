import { Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import { MenuService } from '../../menu/menu.service';
import { MenuDto } from '../../menu/dto/menu.dto';
import { OptionDto } from '../../menu/dto/option.dto';
import { CategoryDto } from '../../menu/dto/category.dto';
import { QueryMenuDto } from './dto/menu.dto';

@Injectable()
export class AdminMenuService {
  constructor(private menuService: MenuService) {}

  create(menu: MenuDto) {
    return this.menuService.create(menu);
  }

  getAll(queryDto: QueryMenuDto) {
    return this.menuService.findAll({
      where: {
        name: Like(`%${queryDto.q}%`),
        category_id: queryDto.category_id,
      },
      select: ['id', 'name', 'image_url'],
    });
  }

  getById(id: number) {
    return this.menuService.findOne({
      where: { id },
      relations: ['category', 'options'],
      order: {
        options: {
          group_name: 'DESC',
          additional_price: 'ASC',
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
      order: { priority: 'ASC' },
    });
  }

  updateCategory(id: number, category: CategoryDto): Promise<boolean> {
    return this.menuService.updateCategory(id, category);
  }

  deleteCategory(id: number): Promise<boolean> {
    return this.menuService.deleteCategory(id);
  }
}
