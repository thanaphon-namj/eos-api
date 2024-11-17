import { Injectable } from '@nestjs/common';
import { OrdersService } from '../../orders/orders.service';
import { OrderStatus } from '../../orders/order.entity';

@Injectable()
export class AdminPosService {
  constructor(private ordersService: OrdersService) {}

  getInbox() {
    return this.ordersService.findAllByStatus(OrderStatus.Confirmed);
  }

  getOrderByReferenceCode(referenceCode: string) {
    return this.ordersService.findByReferenceCode(referenceCode);
  }
}
