import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Menu } from './menu.entity';
import { MenuOption } from './menu-option.entity';

@Entity({ name: 'MenuOptionMapping' })
export class MenuOptionMapping {
  @PrimaryColumn()
  menu_id: number;

  @PrimaryColumn()
  option_id: number;

  @ManyToOne(() => Menu, (menu) => menu.options)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @ManyToOne(() => MenuOption, (option) => option.choices)
  @JoinColumn({ name: 'option_id' })
  option: MenuOption;
}
