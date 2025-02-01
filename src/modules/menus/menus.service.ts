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

  async create(menuDto: any): Promise<Menu> {
    const menu = new Menu();
    menu.name = menuDto.name;
    menu.description = menuDto.description;
    menu.image_url = menuDto.image_url;
    menu.price = menuDto.price;
    menu.is_active = true;
    menu.category_id = menuDto.category_id;
    const menuSaved = await this.menuRepository.save(menu);
    if (menuDto.options.length > 0) {
      const menuOptions = menuDto.options.map((option: any) => {
        const menuOption = new MenuOption();
        menuOption.name = option.name;
        menuOption.additional_price = option.additional_price;
        menuOption.is_active = true;
        menuOption.menu_id = menuSaved.id;
        return menuOption;
      });
      await this.menuOptionRepository.save(menuOptions);
    }
    return menuSaved;
  }

  getAll(categoryId: string | null): Promise<Menu[]> {
    return this.menuRepository.find({
      where: categoryId ? { category_id: +categoryId } : null,
    });
  }

  async getAllGroupByCategory(): Promise<any> {
    const menus = await this.menuRepository.find({ relations: ['category'] });
    return menus.reduce((categories, menu) => {
      const category = categories.find(
        (category) => category.id === menu.category_id,
      );
      if (!category) {
        categories.push({
          ...menu.category,
          items: [
            {
              id: menu.id,
              name: menu.name,
              price: menu.price,
            },
          ],
        });
      } else {
        category.items.push({
          id: menu.id,
          name: menu.name,
          price: menu.price,
        });
      }
      return categories;
    }, []);
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
