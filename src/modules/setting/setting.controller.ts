import { Controller, Get } from '@nestjs/common';
import { SettingService } from './setting.service';

@Controller('setting')
export class SettingController {
  constructor(private settingService: SettingService) {}

  @Get('banner')
  getAllBanner() {
    return this.settingService.findAllBanner();
  }

  @Get('news')
  getAllNews() {
    return [];
  }
}
