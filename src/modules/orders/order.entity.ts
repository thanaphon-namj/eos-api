import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum OrderStatus {
  Created = 'created',
  Pending = 'pending',
  Confirmed = 'confirmed',
  Completed = 'completed',
  Merged = 'merged',
  Cancelled = 'cancelled',
}

export enum PaymentMethod {
  Cash = 'cash',
  PromptPay = 'prompt_pay',
}

@Entity({ name: 'Order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  subtotal: number;

  @Column()
  discount: number;

  @Column()
  total: number;

  @Column()
  payment: PaymentMethod;

  @Column()
  status: OrderStatus;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  seller_id: number;
}
