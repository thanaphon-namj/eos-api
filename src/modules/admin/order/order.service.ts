import { Injectable } from '@nestjs/common';
import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { OrderService } from '../../order/order.service';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class AdminOrderService {
  constructor(private orderService: OrderService) {}

  async getAll(query: QueryDto) {
    const { page = 1, limit = 50 } = query;
    const skip = (page - 1) * limit;
    const where = {
      status: query.status,
    };
    if (query.from && query.to) {
      where['created_at'] = Between(query.from, query.to);
    } else if (query.from) {
      where['created_at'] = MoreThanOrEqual(query.from);
    } else if (query.to) {
      where['created_at'] = LessThanOrEqual(query.to);
    }
    const [orders, total] = await this.orderService.getPaginated({
      where,
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
      },
      skip,
      take: limit,
    });
    return {
      data: orders,
      more: skip + orders.length < total,
    };
  }

  async getById(id: number) {
    return this.orderService.findOne({
      where: {
        id,
      },
      relations: [
        'items',
        'items.menu',
        'items.choices',
        'items.choices.choice',
        'admin',
      ],
      select: {
        id: true,
        code: true,
        name: true,
        subtotal: true,
        discount: true,
        total: true,
        status: true,
        created_at: true,
        updated_at: true,
        items: {
          id: true,
          quantity: true,
          total: true,
          note: true,
          menu_id: true,
          menu: {
            id: true,
            name: true,
          },
          choices: {
            choice_id: true,
            choice: {
              id: true,
              name: true,
            },
          },
        },
        admin: {
          id: true,
          name: true,
        },
      },
    });
  }

  complete(id: number, adminId: number): Promise<boolean> {
    return this.orderService.complete(id, adminId);
  }

  discount(id: number, discount: number): Promise<boolean> {
    return this.orderService.discount(id, discount);
  }

  cancel(id: number, adminId: number): Promise<boolean> {
    return this.orderService.cancel(id, adminId);
  }
}
