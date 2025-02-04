import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  additional_price: number;

  @Column()
  group_name: string;

  @Column()
  status: OptionStatus;

  @Column()
  is_active: boolean;

  @Column()
  menu_id: number;
}
