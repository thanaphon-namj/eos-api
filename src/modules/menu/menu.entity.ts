import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum MenuStatus {
  Available = 'available',
  OutOfStock = 'out_of_stock',
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
  description_en: string;

  @Column()
  image_url: string;

  @Column()
  banner_url: string;

  @Column()
  price: number;

  @Column()
  status: MenuStatus;

  @Column()
  is_active: boolean;

  @Column()
  is_banner: boolean;

  @Column()
  category_id: number;
}
