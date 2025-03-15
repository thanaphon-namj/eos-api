import { OrderStatus } from '../order.entity';

export class OrderDto {
  name?: string;
  status?: OrderStatus;
  admin_id?: number;
}

export class OrderItemDto {
  id?: number;
  quantity: number;
  note?: string;
  options?: number[];
}
