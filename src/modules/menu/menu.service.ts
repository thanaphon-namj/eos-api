import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
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

  async create(menuDto: MenuDto): Promise<Menu> {
    const menu = new Menu();
    menu.name = menuDto.name;
    menu.name_en = menuDto.name_en;
    menu.description = menuDto.description;
    menu.image_url = menuDto.image_url;
    menu.price = menuDto.price;
    menu.status = MenuStatus.Available;
    menu.is_active = true;
    menu.category_id = menuDto.category_id;
    const result = await this.menuRepository.save(menu);
    for await (const optionDto of menuDto.options) {
      const option = new MenuOption();
      option.name = optionDto.name;
      option.additional_price = optionDto.additional_price;
      option.group_name = optionDto.group_name;
      option.status = OptionStatus.Available;
      option.is_active = true;
      option.menu_id = result.id;
      await this.menuOptionRepository.save(option);
    }
    return result;
  }

  findAll(options?: FindManyOptions<Menu>): Promise<Menu[]> {
    return this.menuRepository.find(options);
  }

  findOne(options: FindOneOptions<Menu>): Promise<Menu> {
    return this.menuRepository.findOne(options);
  }

  findOneBy(where: FindOptionsWhere<Menu>): Promise<Menu> {
    return this.menuRepository.findOneBy(where);
  }

  async update(id: number, menuDto: MenuDto): Promise<any> {
    const result = await this.menuRepository.update(id, menuDto);
    return result.affected > 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.menuRepository.delete(id);
    return result.affected > 0;
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

  findAllOption(options?: FindManyOptions<MenuOption>): Promise<MenuOption[]> {
    return this.menuOptionRepository.find(options);
  }

  findOneOption(options: FindOneOptions<MenuOption>): Promise<MenuOption> {
    return this.menuOptionRepository.findOne(options);
  }

  async updateOption(id: number, optionDto: OptionDto): Promise<boolean> {
    const result = await this.menuOptionRepository.update(id, optionDto);
    return result.affected > 0;
  }

  async deleteOption(id: number): Promise<boolean> {
    const result = await this.menuOptionRepository.delete(id);
    return result.affected > 0;
  }

  async createCategory(categoryDto: CategoryDto): Promise<MenuCategory> {
    const categories = await this.menuCategoryRepository.find({
      select: ['priority'],
      order: { priority: 'DESC' },
      take: 1,
    });
    const category = new MenuCategory();
    category.name = categoryDto.name;
    category.priority = categories.length > 0 ? categories[0].priority + 1 : 1;
    return this.menuCategoryRepository.save(category);
  }

  findAllCategory(
    options?: FindManyOptions<MenuCategory>,
  ): Promise<MenuCategory[]> {
    return this.menuCategoryRepository.find(options);
  }

  async updateCategory(id: number, categoryDto: CategoryDto): Promise<boolean> {
    const result = await this.menuCategoryRepository.update(id, categoryDto);
    return result.affected > 0;
  }

  async reorderCategory(categoryDto: CategoryDto[]): Promise<boolean> {
    const categories = await this.menuCategoryRepository.find({
      select: ['id', 'priority'],
    });
    for await (const c of categories) {
      const category = categoryDto.find((d) => d.id === c.id);
      if (category && category.priority !== c.priority) {
        await this.menuCategoryRepository.update(category.id, {
          priority: category.priority,
        });
      }
    }
    return true;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const result = await this.menuCategoryRepository.delete(id);
    return result.affected > 0;
  }
}
