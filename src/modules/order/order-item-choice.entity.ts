import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity({ name: 'OrderItemChoice' })
export class OrderItemChoice {
  @PrimaryColumn()
  item_id: number;

  @PrimaryColumn()
  choice_id: number;

  @ManyToOne(() => OrderItem, (orderItem) => orderItem.choices)
  item: OrderItem;

  // @OneToOne(() => MenuOptionChoice)
  // @JoinColumn({ name: 'choice_id' })
  // choice: MenuOptionChoice;
}
