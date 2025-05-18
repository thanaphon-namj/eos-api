import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdminSettingService } from './setting.service';
import { BannerDto } from '../../menu/dto/category.dto';

@Controller('admin/setting')
export class AdminSettingController {
  constructor(private adminSettingService: AdminSettingService) {}

  @Post('banner')
  async createBanner(@Body() banner: BannerDto) {
    const success = await this.adminSettingService.createBanner(banner);
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Get('banner')
  getAllBanner() {
    return this.adminSettingService.getAllBanner();
  }

  @Put('banner/:id')
  async updateBanner(@Param('id') id: string, @Body() banner: BannerDto) {
    const success = await this.adminSettingService.updateBanner(
      Number(id),
      banner,
    );
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Delete('banner/:id')
  async deleteBanner(@Param('id') id: string) {
    const success = await this.adminSettingService.deleteBanner(Number(id));
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Get('news')
  getAllNews() {
    return [];
  }

  @Get('category')
  getAllCategory() {
    return this.adminSettingService.getAllCategory();
  }
}
