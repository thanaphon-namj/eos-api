import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../modules/admin/users/user.entity';

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

  @ManyToOne(() => User)
  seller_id: User;
}
