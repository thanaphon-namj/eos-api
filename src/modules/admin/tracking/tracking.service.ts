import { Injectable } from '@nestjs/common';
import { OrderStatus } from '../../orders/order.entity';
import { OrdersService } from '../../orders/orders.service';

@Injectable()
export class AdminTrackingService {
  constructor(private ordersService: OrdersService) {}

  getAll(statuses: OrderStatus[]) {
    return this.ordersService.findAllByStatuses(statuses);
  }
}
