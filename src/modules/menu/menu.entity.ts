import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuCategory } from './menu-category.entity';
import { MenuOption } from './menu-option.entity';

export enum MenuStatus {
  Available = 'available',
  OutOfStock = 'outofstock',
}

@Entity({ name: 'Menu' })
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  name_en: string;

  @Column()
  description: string;

  @Column()
  image_url: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  status: MenuStatus;

  @Column()
  is_active: boolean;

  @Column()
  category_id: number;

  @OneToOne(() => MenuCategory)
  @JoinColumn({ name: 'category_id' })
  category: MenuCategory;

  @OneToMany(() => MenuOption, (menuOption) => menuOption.menu)
  options: MenuOption[];
}
