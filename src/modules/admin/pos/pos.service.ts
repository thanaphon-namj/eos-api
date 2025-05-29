import { Injectable } from '@nestjs/common';
import { Between } from 'typeorm';
import { OrderService } from '../../order/order.service';
import { OrderStatus } from '../../order/order.entity';
import { OrderDto, OrderItemDto } from '../../order/dto/order.dto';
import { QueryDto } from '../order/dto/query.dto';
import { getEndOfDay, getStartOfDay, today } from '../../../utils/date';

@Injectable()
export class AdminPosService {
  constructor(private orderService: OrderService) {}

  async getStats() {
    const current = today();
    const result = await this.orderService.findAll({
      where: {
        created_at: Between(getStartOfDay(current), getEndOfDay(current)),
      },
      select: ['status'],
    });
    const stats = Object.fromEntries(
      [
        OrderStatus.Pending,
        OrderStatus.Confirmed,
        OrderStatus.Completed,
        OrderStatus.Cancelled,
      ].map((status) => [status, 0]),
    );
    for (const order of result) {
      if (stats[order.status] !== undefined) {
        stats[order.status]++;
      }
    }
    return stats;
  }

  getInbox(query: QueryDto) {
    const current = today();
    return this.orderService.findAllBy({
      status: query.status,
      created_at: Between(getStartOfDay(current), getEndOfDay(current)),
    });
  }

  addOrderItem(id: number, item: OrderItemDto) {
    return this.orderService.createItem(id, item);
  }

  async updateOrder(id: number, item: OrderDto): Promise<boolean> {
    const success = await this.orderService.update(id, item);
    await this.orderService.calculate(id);
    return success;
  }

  updateOrderItem(id: number, item: OrderItemDto): Promise<boolean> {
    // TODO: implement
    return this.orderService.updateItem(id, item);
  }

  removeOrderItem(id: number): Promise<boolean> {
    return this.orderService.deleteItem(id);
  }
}
