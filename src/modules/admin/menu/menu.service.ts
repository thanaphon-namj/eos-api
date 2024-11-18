import { Injectable } from '@nestjs/common';
import { MenusService } from '../../menus/menus.service';

@Injectable()
export class AdminMenuService {
  constructor(private menusService: MenusService) {}

  createCategory(category: any) {
    return this.menusService.createCategory(category);
  }
}
