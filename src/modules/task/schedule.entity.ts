import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ScheduleStatus {
  Pending = 'pending',
  Successfully = 'successfully',
  Failed = 'failed',
}

@Entity({ name: 'Schedule' })
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  execute_time: Date;

  @Column()
  status: ScheduleStatus;

  @Column()
  order_id: number;
}
