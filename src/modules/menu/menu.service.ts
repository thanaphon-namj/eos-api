import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { Menu, MenuStatus } from './menu.entity';
import { MenuOption } from './menu-option.entity';
import { MenuOptionChoice } from './menu-option-choice.entity';
import { MenuOptionMapping } from './menu-option-mapping.entity';
import { MenuCategory } from './menu-category.entity';
import { MenuDto, UpdateMenuDto } from './dto/menu.dto';
import { OptionDto } from './dto/option.dto';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(MenuOption)
    private menuOptionRepository: Repository<MenuOption>,
    @InjectRepository(MenuOptionChoice)
    private menuOptionChoiceRepository: Repository<MenuOptionChoice>,
    @InjectRepository(MenuOptionMapping)
    private menuOptionMappingRepository: Repository<MenuOptionMapping>,
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
    menu.category_id = menuDto.category_id;
    const result = await this.menuRepository.save(menu);
    for await (const optionId of menuDto.options) {
      const option = new MenuOptionMapping();
      option.menu_id = result.id;
      option.option_id = optionId;
      await this.menuOptionMappingRepository.save(option);
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

  async update(id: number, menu: UpdateMenuDto): Promise<any> {
    const result = await this.menuRepository.update(id, {
      name: menu.name,
      name_en: menu.name_en,
      description: menu.description,
      image_url: menu.image_url,
      price: menu.price,
      status: menu.status,
      is_active: menu.is_active,
      is_recommended: menu.is_recommended,
      category_id: menu.category_id,
    });
    // for await (const optionId of menu.items) {
    //   const option = new MenuOptionMapping();
    //   option.menu_id = id;
    //   option.option_id = optionId;
    //   await this.menuOptionMappingRepository.save(option);
    // }
    return result.affected > 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.menuRepository.delete(id);
    return result.affected > 0;
  }

  async createOption(optionDto: OptionDto): Promise<MenuOption> {
    const option = new MenuOption();
    option.name = optionDto.name;
    option.is_required = optionDto.is_required;
    option.allow_multiple = optionDto.allow_multiple;
    const result = await this.menuOptionRepository.save(option);
    for await (const choice of optionDto.choices) {
      const menuOptionChoice = new MenuOptionChoice();
      menuOptionChoice.name = choice.name;
      menuOptionChoice.additional_price = choice.additional_price;
      menuOptionChoice.status = MenuStatus.Available;
      menuOptionChoice.option_id = result.id;
      await this.menuOptionChoiceRepository.save(menuOptionChoice);
    }
    return result;
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
    const result = await this.menuCategoryRepository.findOne({
      where: {
        parent_id: categoryDto.parent_id,
      },
      select: ['priority'],
      order: {
        priority: 'DESC',
      },
    });
    const category = new MenuCategory();
    category.name = categoryDto.name;
    category.image_url = categoryDto.image_url;
    category.priority = result ? result.priority + 1 : 1;
    if (categoryDto.parent_id) category.parent_id = categoryDto.parent_id;
    return this.menuCategoryRepository.save(category);
  }

  findAllCategory(
    options?: FindManyOptions<MenuCategory>,
  ): Promise<MenuCategory[]> {
    return this.menuCategoryRepository.find(options);
  }

  async updateCategory(id: number, category: CategoryDto): Promise<boolean> {
    const result = await this.menuCategoryRepository.update(id, category);
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
