import { Injectable } from '@nestjs/common';
import { MenuService } from '../../menu/menu.service';

@Injectable()
export class AdminMenuService {
  constructor(private menuService: MenuService) {}

  create(menu: any) {
    return this.menuService.create(menu);
  }

  getAll() {
    return this.menuService.findAll();
  }

  getById(id: number) {
    return this.menuService.findOneById(id);
  }

  update(id: number, menu: any) {
    return this.menuService.update(id, menu);
  }

  delete(id: number) {
    return this.menuService.delete(id);
  }

  createOption(option: any) {
    return this.menuService.createOption(option);
  }

  updateOption(id: number, option: any) {
    return this.menuService.updateOption(id, option);
  }

  deleteOption(id: number) {
    return this.menuService.deleteOption(id);
  }

  createCategory(category: any) {
    return this.menuService.createCategory(category);
  }

  getAllCategory() {
    return this.menuService.findAllCategory();
  }

  updateCategory(id: number, category: any) {
    return this.menuService.updateCategory(id, category);
  }

  deleteCategory(id: number) {
    return this.menuService.deleteCategory(id);
  }
}
