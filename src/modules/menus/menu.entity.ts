import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuCategory } from './menu-category.entity';

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
  description_en: string;

  @Column()
  image_url: string;

  @Column()
  price: number;

  @Column()
  is_active: boolean;

  @Column()
  category_id: number;

  @ManyToOne(() => MenuCategory, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category: MenuCategory;
}
