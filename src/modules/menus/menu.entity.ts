import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Menu' })
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image_url: string;

  @Column()
  price: number;

  @Column()
  is_active: boolean;

  @Column()
  category_id: number;
}
