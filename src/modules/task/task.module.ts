import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { Schedule } from './schedule.entity';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule]), ScheduleModule.forRoot()],
  providers: [TaskService],
})
export class TaskModule {}
