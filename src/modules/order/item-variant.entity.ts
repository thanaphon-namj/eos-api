import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { MenuOption } from '../menu/menu-option.entity';

@Entity({ name: 'ItemVariant' })
export class ItemVariant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item_id: number;

  @Column()
  option_id: number;

  @ManyToOne(() => OrderItem, (orderItem) => orderItem.options)
  @JoinColumn({ name: 'item_id' })
  item: OrderItem;

  @OneToOne(() => MenuOption)
  @JoinColumn({ name: 'option_id' })
  option: MenuOption;
}
