import { Injectable } from '@nestjs/common';
import { IsNull } from 'typeorm';
import { SettingService } from '../../setting/setting.service';
import { MenuService } from '../../menu/menu.service';
import { BannerDto } from '../../menu/dto/category.dto';

@Injectable()
export class AdminSettingService {
  constructor(
    private settingService: SettingService,
    private menuService: MenuService,
  ) {}

  createBanner(banner: BannerDto) {
    return this.menuService.createBanner(banner);
  }

  getAllBanner() {
    return this.menuService.findAllBanner({
      select: ['id', 'name', 'banner_url'],
    });
  }

  updateBanner(id: number, banner: BannerDto) {
    return this.menuService.updateBanner(id, banner);
  }

  deleteBanner(id: number) {
    return this.menuService.deleteBanner(id);
  }

  getAllCategory() {
    return this.menuService.findAllCategory({
      where: {
        parent_id: IsNull(),
      },
      select: ['id', 'name', 'banner_url'],
      order: {
        parent_id: 'ASC',
      },
    });
  }
}
