import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Admin } from '../user/admin.entity';

export enum OrderStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

@Entity({ name: 'Order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ type: 'decimal' })
  subtotal: number;

  @Column({ type: 'decimal' })
  discount: number;

  @Column({ type: 'decimal' })
  total: number;

  @Column()
  status: OrderStatus;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @Column()
  admin_id: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];

  @OneToOne(() => Admin)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;
}
