import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuOption } from './menu-option.entity';

@Entity({ name: 'MenuOptionChoice' })
export class MenuOptionChoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  additional_price: number;

  // @Column()
  // status: MenuStatus;

  // @Column()
  // is_active: boolean;

  @Column()
  is_default: boolean;

  @Column()
  option_id: number;

  @ManyToOne(() => MenuOption, (option) => option.choices)
  @JoinColumn({ name: 'option_id' })
  option: MenuOption;
}
