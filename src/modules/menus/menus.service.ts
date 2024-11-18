import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuCategory } from './menu-category.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(MenuCategory)
    private menuCategoryRepository: Repository<MenuCategory>,
  ) {}

  createCategory(categoryDto: any): Promise<MenuCategory> {
    const category = new MenuCategory();
    category.name = categoryDto.name;
    return this.menuCategoryRepository.save(category);
  }

  deleteCategory(id: number): Promise<any> {
    return this.menuCategoryRepository.delete(id);
  }
}
