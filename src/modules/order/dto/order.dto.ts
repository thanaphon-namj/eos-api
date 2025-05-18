import { OrderStatus } from '../order.entity';

export interface OrderDto {
  name?: string;
  status?: OrderStatus;
  admin_id?: number;
}

export interface OrderItemDto {
  id?: number;
  quantity: number;
  note?: string;
  choices?: number[];
  options?: number[];
}
