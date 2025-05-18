import { Injectable } from '@nestjs/common';
import { SettingService } from '../../setting/setting.service';

@Injectable()
export class AdminSettingService {
  constructor(private settingService: SettingService) {}

  getAllBanner() {
    return this.settingService.findAllBanner();
  }
}
