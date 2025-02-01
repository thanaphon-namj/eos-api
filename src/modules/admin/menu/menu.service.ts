import { Injectable } from '@nestjs/common';
import { MenusService } from '../../menus/menus.service';

@Injectable()
export class AdminMenuService {
  constructor(private menusService: MenusService) {}

  create(menu: any) {
    return this.menusService.create(menu);
  }

  getAll(categoryId: string | null) {
    return this.menusService.getAll(categoryId);
  }

  getById(id: number) {
    return this.menusService.findOneById(id);
  }

  update(id: number, menu: any) {
    return this.menusService.update(id, menu);
  }

  delete(id: number) {
    return this.menusService.delete(id);
  }

  createOption(option: any) {
    return this.menusService.createOption(option);
  }

  updateOption(id: number, option: any) {
    return this.menusService.updateOption(id, option);
  }

  deleteOption(id: number) {
    return this.menusService.deleteOption(id);
  }

  createCategory(category: any) {
    return this.menusService.createCategory(category);
  }

  getAllCategory() {
    return this.menusService.getAllCategory();
  }

  updateCategory(id: number, category: any) {
    return this.menusService.updateCategory(id, category);
  }

  deleteCategory(id: number) {
    return this.menusService.deleteCategory(id);
  }
}
