import { Controller, Get } from '@nestjs/common';
import { AdminSettingService } from './setting.service';

@Controller('setting')
export class AdminSettingController {
  constructor(private adminSettingService: AdminSettingService) {}

  @Get('banner')
  getAllBanner() {
    return this.adminSettingService.getAllBanner();
  }

  @Get('news')
  getAllNews() {
    return [];
  }
}
