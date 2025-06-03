import { Controller, Get } from '@nestjs/common';
import { SettingService } from './setting.service';
import { MenuService } from '../menu/menu.service';

@Controller('setting')
export class SettingController {
  constructor(
    private settingService: SettingService,
    private menuService: MenuService,
  ) {}

  @Get('banner')
  getAllBanner() {
    return this.menuService.findAllBanner({
      select: ['id', 'banner_url'],
    });
  }

  @Get('news')
  getAllNews() {
    return this.settingService.findAllNews();
  }
}
