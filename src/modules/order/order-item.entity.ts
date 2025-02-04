import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'OrderItem' })
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  total: number;

  @Column()
  note: string;

  @Column()
  order_id: number;

  @Column()
  menu_id: number;
}
