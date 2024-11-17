import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  variant: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  total: number;

  @ManyToOne(() => Order)
  order_id: Order;

  // @ManyToOne(() => Menu)
  // menu_id: Menu;
}
