import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';
import { MenuCategory } from './menu-category.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(MenuCategory)
    private menuCategoryRepository: Repository<MenuCategory>,
  ) {}

  create(menuDto: any): Promise<Menu> {
    const menu = new Menu();
    menu.name = menuDto.name;
    menu.description = menuDto.description;
    menu.image_url = menuDto.image_url;
    menu.price = menuDto.price;
    menu.is_active = menuDto.is_active;
    menu.category_id = menuDto.category_id;
    return this.menuRepository.save(menu);
  }

  update(id: number, menuDto: any): Promise<any> {
    return this.menuRepository.update(id, menuDto);
  }

  delete(id: number): Promise<any> {
    return this.menuRepository.delete(id);
  }

  createCategory(categoryDto: any): Promise<MenuCategory> {
    const category = new MenuCategory();
    category.name = categoryDto.name;
    return this.menuCategoryRepository.save(category);
  }

  getAllCategory(): Promise<MenuCategory[]> {
    return this.menuCategoryRepository.find();
  }

  updateCategory(id: number, categoryDto: any): Promise<any> {
    return this.menuCategoryRepository.update(id, categoryDto);
  }

  deleteCategory(id: number): Promise<any> {
    return this.menuCategoryRepository.delete(id);
  }
}
