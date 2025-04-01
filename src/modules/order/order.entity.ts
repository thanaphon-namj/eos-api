import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  Created = 'created',
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
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  admin_id: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];
}
