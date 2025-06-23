import { Injectable } from '@nestjs/common';
import { Between } from 'typeorm';
import { OrderService } from '../../order/order.service';
import { OrderStatus } from '../../order/order.entity';
import { QueryDto } from '../order/dto/query.dto';
import { getEndOfDay, getStartOfDay } from '../../../utils/date';

@Injectable()
export class AdminPosService {
  constructor(private orderService: OrderService) {}

  async getStats() {
    const result = await this.orderService.findAll({
      where: {
        created_at: Between(getStartOfDay(), getEndOfDay()),
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
    const created_at = Between(getStartOfDay(), getEndOfDay());
    console.log(created_at.value);
    const [orders, total] = await this.orderService.getPaginated({
      where: {
        status: query.status,
        created_at: created_at,
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
          quantity: true,
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
    };
  }
}
