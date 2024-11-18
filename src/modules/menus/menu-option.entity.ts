import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'MenuOption' })
export class MenuOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  additional_price: number;

  @Column()
  menu_id: number;
}
