import { Injectable } from '@nestjs/common';
import { OrderService } from '../../order/order.service';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class AdminOrderService {
  constructor(private orderService: OrderService) {}

  getAll(query: QueryDto) {
    return this.orderService.findAllBy({ status: query.status });
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
      },
    });
  }

  complete(id: number, adminId: number): Promise<boolean> {
    return this.orderService.complete(id, adminId);
  }

  cancel(id: number, adminId: number): Promise<boolean> {
    return this.orderService.cancel(id, adminId);
  }
}
