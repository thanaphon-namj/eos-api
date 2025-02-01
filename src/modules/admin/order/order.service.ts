import { Injectable } from '@nestjs/common';
import { OrdersService } from '../../orders/orders.service';

@Injectable()
export class AdminOrderService {
  constructor(private ordersService: OrdersService) {}

  getAll(query: any) {
    return this.ordersService.findAll(query);
  }

  getById(id: number) {
    // return this.ordersService.findById(id);
  }

  completeOrder(id: number) {
    // return this.ordersService.completeOrder(id);
  }

  cancelOrder(id: number) {
    return this.ordersService.cancelOrder(id);
  }
}
