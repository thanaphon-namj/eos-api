import { Injectable } from '@nestjs/common';
import { Between } from 'typeorm';
import { OrderService } from '../../order/order.service';
import { OrderStatus } from '../../order/order.entity';
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

  async getInbox(query: QueryDto) {
    const { page = 1, limit = 50 } = query;
    const skip = (page - 1) * limit;
    const current = today();
    const [orders, total] = await this.orderService.getPaginated({
      where: {
        status: query.status,
        created_at: Between(getStartOfDay(current), getEndOfDay(current)),
      },
      relations: ['items'],
      select: {
        id: true,
        code: true,
        name: true,
        total: true,
        status: true,
        created_at: true,
        updated_at: true,
        items: {
          id: true,
        },
      },
      order: {
        created_at: 'DESC',
        updated_at: 'DESC',
      },
      skip,
      take: limit,
    });
    return {
      data: orders,
      total,
      more: skip + orders.length < total,
      current_date: current,
    };
  }
}
