import { Injectable } from '@nestjs/common';
import { OrderService } from '../../order/order.service';
import { Order, OrderStatus } from '../../order/order.entity';

@Injectable()
export class AdminPosService {
  constructor(private orderService: OrderService) {}

  getInbox(): Promise<Order[]> {
    return this.orderService.findAll({
      where: {
        status: OrderStatus.Confirmed,
      },
      select: ['id', 'code', 'name'],
      order: {
        updated_at: 'DESC',
      },
    });
  }

  getOrderByCode(code: string): Promise<Order> {
    return this.orderService.findOneBy({
      code,
      status: OrderStatus.Confirmed,
    });
  }
}
