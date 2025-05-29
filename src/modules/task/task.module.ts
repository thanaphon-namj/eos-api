import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { Schedule } from './schedule.entity';
import { OrderModule } from '../order/order.module';
import { TaskService } from './task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule]),
    ScheduleModule.forRoot(),
    OrderModule,
  ],
  providers: [TaskService],
})
export class TaskModule {}
