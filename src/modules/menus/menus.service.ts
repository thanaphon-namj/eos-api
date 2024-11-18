import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';
import { MenuOption } from './menu-option.entity';
import { MenuCategory } from './menu-category.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(MenuOption)
    private menuOptionRepository: Repository<MenuOption>,
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

  getAll(): Promise<Menu[]> {
    return this.menuRepository.find();
  }

  findOneById(id: number): Promise<Menu> {
    return this.menuRepository.findOneBy({ id });
  }

  update(id: number, menuDto: any): Promise<any> {
    return this.menuRepository.update(id, menuDto);
  }

  delete(id: number): Promise<any> {
    return this.menuRepository.delete(id);
  }

  createOption(optionDto: any): Promise<MenuOption> {
    const option = new MenuOption();
    option.name = optionDto.name;
    option.additional_price = optionDto.additional_price;
    option.is_active = optionDto.is_active;
    option.menu_id = optionDto.menu_id;
    return this.menuOptionRepository.save(option);
  }

  updateOption(id: number, optionDto: any): Promise<any> {
    return this.menuOptionRepository.update(id, optionDto);
  }

  deleteOption(id: number): Promise<any> {
    return this.menuOptionRepository.delete(id);
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
