import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Menu } from './menu.entity';

export enum OptionStatus {
  Available = 'available',
  OutOfStock = 'out_of_stock',
}

@Entity({ name: 'MenuOption' })
export class MenuOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal' })
  additional_price: number;

  @Column()
  group_name: string;

  @Column()
  status: OptionStatus;

  @Column()
  is_active: boolean;

  @Column()
  menu_id: number;

  @ManyToOne(() => Menu, (menu) => menu.options)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;
}
