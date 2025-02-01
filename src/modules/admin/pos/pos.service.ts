import { Injectable } from '@nestjs/common';
import { OrdersService } from '../../orders/orders.service';
import { OrderStatus } from '../../orders/order.entity';
import { MenusService } from '../../menus/menus.service';

@Injectable()
export class AdminPosService {
  constructor(
    private ordersService: OrdersService,
    private menusService: MenusService,
  ) {}

  getInbox() {
    return this.ordersService.findAllByStatus(OrderStatus.Confirmed);
  }

  getAllMenu() {
    return this.menusService.getAllGroupByCategory();
  }

  getOrderByCode(code: string) {
    return this.ordersService.findByCode(code);
  }

  cancelOrder(id: number) {
    return this.ordersService.cancelOrder(id);
  }

  discountOrder(id: number, orderDto: any) {
    return this.ordersService.discountOrder(id, orderDto);
  }

  paidOrder(id: number, orderDto: any) {
    return this.ordersService.paidOrder(id, orderDto);
  }

  addOrderItem(id: number, orderItemDto: any) {
    return this.ordersService.addOrderItem(id, orderItemDto);
  }

  updateOrderItem(id: number, orderItemDto: any) {
    return this.ordersService.updateOrderItem(id, orderItemDto);
  }

  deleteOrderItem(id: number) {
    return this.ordersService.deleteOrderItem(id);
  }
}
