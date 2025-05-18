import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Setting } from './setting.entity';
import { MenuService } from '../menu/menu.service';
import { SettingDto } from './dto/setting.dto';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>,
    private menuService: MenuService,
  ) {}

  create(settingDto: SettingDto) {
    const setting = new Setting();
    setting.name = settingDto.name;
    setting.value = settingDto.value;
    return this.settingRepository.save(setting);
  }

  findOne(options: FindOneOptions<Setting>): Promise<Setting> {
    return this.settingRepository.findOne(options);
  }

  findAllBanner() {
    return this.menuService.findAllBanner({
      select: ['id', 'banner_url'],
    });
  }
}
