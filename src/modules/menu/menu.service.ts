import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu, MenuStatus } from './menu.entity';
import { MenuOption, OptionStatus } from './menu-option.entity';
import { MenuCategory } from './menu-category.entity';
import { MenuDto } from './dto/menu.dto';
import { OptionDto } from './dto/option.dto';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(MenuOption)
    private menuOptionRepository: Repository<MenuOption>,
    @InjectRepository(MenuCategory)
    private menuCategoryRepository: Repository<MenuCategory>,
  ) {}

  create(menuDto: MenuDto): Promise<Menu> {
    const menu = new Menu();
    menu.name = menuDto.name;
    menu.name_en = menuDto.name_en;
    menu.description = menuDto.description;
    menu.description_en = menuDto.description_en;
    menu.image_url = menuDto.image_url;
    menu.price = menuDto.price;
    menu.status = MenuStatus.Available;
    menu.is_active = true;
    menu.category_id = menuDto.category_id;
    return this.menuRepository.save(menu);
  }

  findAll(): Promise<Menu[]> {
    return this.menuRepository.find();
  }

  findOneById(id: number): Promise<Menu> {
    return this.menuRepository.findOneBy({ id });
  }

  update(id: number, menuDto: MenuDto): Promise<any> {
    return this.menuRepository.update(id, menuDto);
  }

  delete(id: number): Promise<any> {
    return this.menuRepository.delete(id);
  }

  createOption(optionDto: OptionDto): Promise<MenuOption> {
    const option = new MenuOption();
    option.name = optionDto.name;
    option.additional_price = optionDto.additional_price;
    option.group_name = optionDto.group_name;
    option.status = OptionStatus.Available;
    option.is_active = true;
    option.menu_id = optionDto.menu_id;
    return this.menuOptionRepository.save(option);
  }

  updateOption(id: number, optionDto: OptionDto): Promise<any> {
    return this.menuOptionRepository.update(id, optionDto);
  }

  deleteOption(id: number): Promise<any> {
    return this.menuOptionRepository.delete(id);
  }

  createCategory(categoryDto: CategoryDto): Promise<MenuCategory> {
    const category = new MenuCategory();
    category.name = categoryDto.name;
    category.priority = categoryDto.priority;
    return this.menuCategoryRepository.save(category);
  }

  findAllCategory(): Promise<MenuCategory[]> {
    return this.menuCategoryRepository.find();
  }

  updateCategory(id: number, categoryDto: CategoryDto): Promise<any> {
    return this.menuCategoryRepository.update(id, categoryDto);
  }

  deleteCategory(id: number): Promise<any> {
    return this.menuCategoryRepository.delete(id);
  }
}
