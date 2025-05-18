import { OrderStatus } from '../../../order/order.entity';

export interface QueryDto {
  status: OrderStatus;
  created_at: Date;
}
