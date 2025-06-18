import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { In, Repository } from 'typeorm';
import { Schedule, ScheduleStatus } from './schedule.entity';
import { OrderService } from '../order/order.service';
import { SettingService } from '../setting/setting.service';
import { isMoreThanOrEqual } from '../../utils/date';

@Injectable()
export class TaskService {
  private logger = new Logger(TaskService.name);

  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    private orderService: OrderService,
    private settingService: SettingService,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    const schedules = await this.scheduleRepository.find({
      where: {
        status: In([ScheduleStatus.Pending, ScheduleStatus.Failed]),
      },
      select: ['id', 'execute_time', 'order_id'],
    });
    for await (const schedule of schedules) {
      if (isMoreThanOrEqual(schedule.execute_time)) {
        try {
          await this.orderService.cancel(schedule.order_id);
          await this.scheduleRepository.update(schedule.id, {
            status: ScheduleStatus.Success,
          });
          this.logger.log(`Order ${schedule.order_id} is cancelled.`);
        } catch (error) {
          this.logger.error(`Order ${schedule.order_id} is failed: ${error}`);
          await this.scheduleRepository.update(schedule.id, {
            status: ScheduleStatus.Failed,
          });
        }
      }
    }
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async renewToken() {
    try {
      const success = await this.settingService.renewToken();
      if (success) {
        this.logger.log('Facebook token is renewed.');
      } else {
        this.logger.error('Facebook renew token is failed.');
      }
    } catch (error) {
      this.logger.error(`Facebook renew token is failed: ${error}`);
    }
  }
}
