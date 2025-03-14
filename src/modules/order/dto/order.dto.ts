import { OrderStatus } from '../order.entity';

export class OrderDto {
  name?: string;
  status?: OrderStatus;
}

export class OrderItemDto {
  id?: number;
  quantity: number;
  note?: string;
  options?: number[];
}
