import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'OrderItem' })
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ type: 'decimal' })
  total: number;

  @Column()
  note: string;

  @Column()
  order_id: number;

  @Column()
  menu_id: number;
}
