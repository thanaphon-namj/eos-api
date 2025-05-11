import { Injectable } from '@nestjs/common';
import { OrderService } from '../../order/order.service';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class AdminOrderService {
  constructor(private orderService: OrderService) {}

  getAll(query: QueryDto) {
    return this.orderService.findAllBy({ status: query.status });
  }

  async getOrderById(id: number) {
    const order = await this.orderService.findOne({
      where: {
        id,
      },
      relations: [
        'items',
        'items.menu',
        'items.options',
        'items.options.option',
      ],
      select: {
        id: true,
        code: true,
        name: true,
        subtotal: true,
        discount: true,
        total: true,
        status: true,
        updated_at: true,
        items: {
          id: true,
          quantity: true,
          total: true,
          note: true,
          menu_id: true,
          // menu: {
          //   id: true,
          //   name: true,
          // },
          // options: {
          //   id: true,
          //   item_id: true,
          //   // เปลี่ยนเป็น choice
          //   // option_id: true,
          //   // option: {
          //   //   id: true,
          //   //   name: true,
          //   //   additional_price: true,
          //   //   group_name: true,
          //   // },
          // },
        },
      },
    });
    return {
      ...order,
      items: order.items.map((item) => ({
        ...item,
        // options: item.options.map((option) => option.option),
      })),
    };
  }

  completeOrder(id: number, adminId: number): Promise<boolean> {
    return this.orderService.completeOrder(id, adminId);
  }

  cancelOrder(id: number, adminId: number): Promise<boolean> {
    return this.orderService.cancelOrder(id, adminId);
  }
}
