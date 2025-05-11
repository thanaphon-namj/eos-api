import { OrderStatus } from '../../../order/order.entity';

export class QueryDto {
  status: OrderStatus;
  created_at: Date;
}
