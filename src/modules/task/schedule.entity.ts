import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ScheduleStatus {
  Pending = 'pending',
  Success = 'success',
  Failed = 'failed',
}

@Entity({ name: 'Schedule' })
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  execute_time: string;

  @Column()
  status: ScheduleStatus;

  @Column()
  order_id: number;
}
