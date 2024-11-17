import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reference_code: string;

  @Column()
  name: string;

  @Column()
  subtotal: number;

  @Column()
  discount: number;

  @Column()
  total: number;

  @Column()
  payment: string;

  @Column()
  status: string;

  @Column()
  created_at: Date;

  @Column()
  seller_id: number;
}
