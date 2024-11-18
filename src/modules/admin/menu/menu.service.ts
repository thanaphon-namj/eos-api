import { Injectable } from '@nestjs/common';
import { MenusService } from '../../menus/menus.service';

@Injectable()
export class AdminMenuService {
  constructor(private menusService: MenusService) {}

  create(menu: any) {
    return this.menusService.create(menu);
  }

  getAll() {
    return this.menusService.getAll();
  }

  update(id: number, menu: any) {
    return this.menusService.update(id, menu);
  }

  delete(id: number) {
    return this.menusService.delete(id);
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
