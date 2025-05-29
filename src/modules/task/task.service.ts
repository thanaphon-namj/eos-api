import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Between, In, Repository } from 'typeorm';
import { Schedule, ScheduleStatus } from './schedule.entity';
import { OrderStatus } from '../order/order.entity';
import { OrderService } from '../order/order.service';
import {
  getEndOfDay,
  getStartOfDay,
  isMoreThanOrEqual,
  today,
} from '../../utils/date';

@Injectable()
export class TaskService {
  private logger = new Logger(TaskService.name);

  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    private orderService: OrderService,
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
      if (isMoreThanOrEqual(schedule.execute_time, 15)) {
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

  @Cron(CronExpression.EVERY_DAY_AT_11PM)
  async handleCronDaily() {
    const current = today();
    const orders = await this.orderService.findAll({
      where: {
        status: OrderStatus.Confirmed,
        created_at: Between(getStartOfDay(current), getEndOfDay(current)),
      },
    });
    for await (const order of orders) {
      await this.orderService.cancel(order.id);
      this.logger.log(`Order ${order.id} is cancelled.`);
    }
  }
}
