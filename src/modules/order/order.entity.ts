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
  BankTransfer = 'bank_transfer',
  CreditCard = 'credit_card',
}

@Entity({ name: 'Order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ type: 'decimal' })
  subtotal: number;

  @Column({ type: 'decimal' })
  discount: number;

  @Column({ type: 'decimal' })
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
  admin_id: number;
}
