import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { Schedule, ScheduleStatus } from './schedule.entity';

@Injectable()
export class TaskService {
  private logger = new Logger(TaskService.name);

  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    // TODO: query schedule for execution
    const schedules = await this.scheduleRepository.find({
      where: {
        status: ScheduleStatus.Pending,
      },
      select: ['execute_time', 'order_id'],
    });

    for (const schedule of schedules) {
      // TODO: update order status = cancelled
      console.log(schedule);
    }
  }

  create(orderId: number) {
    const schedule = new Schedule();
    // TODO: calculate execute time = current time + 20min
    schedule.execute_time = new Date();
    schedule.status = ScheduleStatus.Pending;
    schedule.order_id = orderId;
    return this.scheduleRepository.save(schedule);
  }
}
