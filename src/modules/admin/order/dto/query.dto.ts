import { OrderStatus } from '../../../order/order.entity';

export interface QueryDto {
  status: OrderStatus;
  from: string;
  to: string;
}
