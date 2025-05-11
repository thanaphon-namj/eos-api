import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Menu } from '../menu/menu.entity';
import { OrderItemChoice } from './order-item-choice.entity';

@Entity({ name: 'OrderItem' })
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ type: 'decimal' })
  total: number;

  @Column()
  note: string;

  @Column()
  order_id: number;

  @Column()
  menu_id: number;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @OneToOne(() => Menu)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @OneToMany(() => OrderItemChoice, (orderItemChoice) => orderItemChoice.item)
  choices: OrderItemChoice[];
}
