import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Setting } from './setting.entity';
import { MenuModule } from '../menu/menu.module';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Setting]),
    HttpModule.register({ timeout: 10000 }),
    MenuModule,
  ],
  controllers: [SettingController],
  providers: [SettingService],
  exports: [SettingService],
})
export class SettingModule {}
