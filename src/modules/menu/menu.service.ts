import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  In,
  IsNull,
  Not,
  Repository,
} from 'typeorm';
import { Menu, MenuStatus } from './menu.entity';
import { MenuOption } from './menu-option.entity';
import { MenuOptionChoice } from './menu-option-choice.entity';
import { MenuOptionMapping } from './menu-option-mapping.entity';
import { MenuCategory } from './menu-category.entity';
import { MenuDto } from './dto/menu.dto';
import { OptionDto } from './dto/option.dto';
import { BannerDto, CategoryDto } from './dto/category.dto';
import { compareArray } from '../../utils/array';

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
    menu.status =
      menuDto.status === 'outofstock'
        ? MenuStatus.OutOfStock
        : MenuStatus.Available;
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

  getPaginated(options: FindManyOptions<Menu>): Promise<[Menu[], number]> {
    return this.menuRepository.findAndCount(options);
  }

  findOne(options: FindOneOptions<Menu>): Promise<Menu> {
    return this.menuRepository.findOne(options);
  }

  async update(id: number, menu: MenuDto): Promise<any> {
    const result = await this.menuRepository.update(id, {
      name: menu.name,
      name_en: menu.name_en,
      description: menu.description,
      image_url: menu.image_url,
      price: menu.price,
      status: menu.status,
      is_recommended: menu.is_recommended,
      category_id: menu.category_id,
    });
    const options = await this.menuOptionMappingRepository.find({
      where: {
        menu_id: id,
      },
      select: ['option_id'],
    });
    const optionIds = options.map((option) => option.option_id);
    if (!compareArray(optionIds, menu.options)) {
      if (optionIds.length > 0) {
        await this.menuOptionMappingRepository.delete({ menu_id: id });
      }
      for await (const optionId of menu.options) {
        const option = new MenuOptionMapping();
        option.menu_id = id;
        option.option_id = optionId;
        await this.menuOptionMappingRepository.save(option);
      }
    }
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
      menuOptionChoice.is_default = choice.is_default;
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

  async updateOption(id: number, option: OptionDto): Promise<boolean> {
    const result = await this.menuOptionRepository.update(id, {
      name: option.name,
      is_required: option.is_required,
      allow_multiple: option.allow_multiple,
    });
    const choices = await this.menuOptionChoiceRepository.find({
      where: {
        option_id: id,
      },
      select: ['id'],
    });
    const oldIds = choices.map((choice) => choice.id);
    const newIds = option.choices.map((choice) => {
      if (!choice.id) return null;
      return choice.id;
    });
    if (compareArray(oldIds, newIds)) {
      for await (const choice of option.choices) {
        await this.menuOptionChoiceRepository.update(choice.id, {
          name: choice.name,
          additional_price: choice.additional_price,
          is_default: choice.is_default,
        });
      }
    } else {
      const deleteIds = oldIds.filter((id) => {
        return !newIds.includes(id) && id !== null;
      });
      if (deleteIds.length > 0) {
        await this.menuOptionChoiceRepository.delete({ id: In(deleteIds) });
      }
      const createChoices = option.choices.filter((choice) => !choice.id);
      for await (const choice of createChoices) {
        const menuOptionChoice = new MenuOptionChoice();
        menuOptionChoice.name = choice.name;
        menuOptionChoice.additional_price = choice.additional_price;
        menuOptionChoice.is_default = choice.is_default;
        menuOptionChoice.option_id = id;
        await this.menuOptionChoiceRepository.save(menuOptionChoice);
      }
    }
    return result.affected > 0;
  }

  async deleteOption(id: number): Promise<boolean> {
    const result = await this.menuOptionRepository.delete(id);
    return result.affected > 0;
  }

  async createCategory(categoryDto: CategoryDto): Promise<MenuCategory> {
    const category = new MenuCategory();
    category.name = categoryDto.name;
    category.image_url = categoryDto.image_url;
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

  async deleteCategory(id: number): Promise<boolean> {
    const result = await this.menuCategoryRepository.delete(id);
    return result.affected > 0;
  }

  async createBanner(banner: BannerDto) {
    const result = await this.menuCategoryRepository.update(
      banner.category_id,
      {
        banner_url: banner.image_url,
      },
    );
    return result.affected > 0;
  }

  findAllBanner(
    options?: FindManyOptions<MenuCategory>,
  ): Promise<MenuCategory[]> {
    return this.menuCategoryRepository.find({
      where: {
        banner_url: Not(IsNull()),
      },
      select: options.select,
    });
  }

  async updateBanner(id: number, banner: BannerDto) {
    const result = await this.menuCategoryRepository.update(id, {
      banner_url: null,
    });
    await this.menuCategoryRepository.update(banner.category_id, {
      banner_url: banner.image_url,
    });
    return result.affected > 0;
  }

  async deleteBanner(id: number) {
    const result = await this.menuCategoryRepository.update(id, {
      banner_url: null,
    });
    return result.affected > 0;
  }
}
