import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { FindManyOptions, FindOneOptions, In, Repository } from 'typeorm';
import { catchError, firstValueFrom } from 'rxjs';
import { Setting } from './setting.entity';
import { FACEBOOK } from '../../environments';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>,
    private httpService: HttpService,
  ) {}

  create(name: string, value: string) {
    const setting = new Setting();
    setting.name = name;
    setting.value = value;
    return this.settingRepository.save(setting);
  }

  findAll(options?: FindManyOptions<Setting>): Promise<Setting[]> {
    return this.settingRepository.find(options);
  }

  findOne(options: FindOneOptions<Setting>): Promise<Setting> {
    return this.settingRepository.findOne(options);
  }

  update(id: number, value: string) {
    return this.settingRepository.update(id, { value });
  }

  async findAllNews() {
    const result = await this.findAll({
      where: {
        name: In(['FACEBOOK_PAGE_ID', 'FACEBOOK_PAGE_TOKEN']),
      },
      select: ['name', 'value'],
    });
    const id = result.find((setting) => setting.name === 'FACEBOOK_PAGE_ID');
    const accessToken = result.find(
      (setting) => setting.name === 'FACEBOOK_PAGE_TOKEN',
    );
    if (!id || !accessToken) {
      return { success: false, data: [] };
    }
    const response = await firstValueFrom(
      this.httpService
        .get<{
          data: {
            id: string;
            message: string;
            full_picture?: string;
            permalink_url: string;
          }[];
        }>(`https://graph.facebook.com/${id.value}/posts`, {
          params: {
            fields: 'id,message,full_picture,permalink_url',
            limit: 6,
            access_token: accessToken.value,
          },
        })
        .pipe(
          catchError(() => {
            throw 'Facebook: An error happened!';
          }),
        ),
    );
    return {
      success: !!id && !!accessToken,
      data: response.data.data.map((item) => ({
        id: item.id,
        message: item.message,
        full_picture: item.full_picture || null,
        permalink_url: item.permalink_url,
      })),
    };
  }

  async renewToken() {
    const accessToken = await this.findOne({
      where: {
        name: 'FACEBOOK_PAGE_TOKEN',
      },
      select: ['id', 'value'],
    });
    if (!accessToken) {
      return false;
    }
    const response = await firstValueFrom(
      this.httpService
        .get<{
          access_token: string;
          token_type: string;
          expires_in: number;
        }>('https://graph.facebook.com/v22.0/oauth/access_token', {
          params: {
            grant_type: 'fb_exchange_token',
            client_id: FACEBOOK.APP_ID,
            client_secret: FACEBOOK.APP_SECRET,
            fb_exchange_token: accessToken.value,
          },
        })
        .pipe(
          catchError(() => {
            throw 'Facebook: An error happened!';
          }),
        ),
    );
    const result = await this.update(
      accessToken.id,
      response.data.access_token,
    );
    return result.affected > 0;
  }

  async clear(): Promise<boolean> {
    const result = await this.findAll({
      where: {
        name: In(['FACEBOOK_PAGE_ID', 'FACEBOOK_PAGE_TOKEN']),
      },
    });
    for await (const setting of result) {
      await this.settingRepository.delete(setting.id);
    }
    return true;
  }
}
