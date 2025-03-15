import { Injectable } from '@nestjs/common';
import { OrderService } from '../../order/order.service';
import { MenuService } from 'src/modules/menu/menu.service';
import { Order, OrderStatus } from '../../order/order.entity';
import { OrderDto, OrderItemDto } from '../../order/dto/order.dto';

@Injectable()
export class AdminPosService {
  constructor(
    private orderService: OrderService,
    private menuService: MenuService,
  ) {}

  getInbox(): Promise<Order[]> {
    return this.orderService.findAll({
      where: {
        status: OrderStatus.Confirmed,
      },
      select: ['id', 'code', 'name', 'total'],
      order: {
        updated_at: 'DESC',
      },
    });
  }

  async getOrderByCode(code: string) {
    const order = await this.orderService.findOne({
      where: {
        code,
        status: OrderStatus.Confirmed,
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
        payment: true,
        status: true,
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
          options: {
            id: true,
            item_id: true,
            option_id: true,
            option: {
              id: true,
              name: true,
            },
          },
        },
      },
    });
    return {
      ...order,
      items: order.items.map((item) => ({
        ...item,
        options: item.options.map((option) => option.option),
      })),
    };
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
        payment: true,
        status: true,
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
          options: {
            id: true,
            item_id: true,
            option_id: true,
            option: {
              id: true,
              name: true,
              additional_price: true,
              group_name: true,
            },
          },
        },
      },
    });
    return {
      ...order,
      items: order.items.map((item) => ({
        ...item,
        options: item.options.map((option) => option.option),
      })),
    };
  }

  getAllMenu() {
    return this.menuService.findAll({
      where: {
        is_active: true,
      },
      relations: ['category'],
      select: ['id', 'name', 'image_url'],
      order: {
        category: {
          priority: 'ASC',
        },
      },
    });
  }

  async getMenuById(id: number) {
    const menu = await this.menuService.findOne({
      where: {
        id: Number(id),
      },
      relations: ['options'],
      select: ['id', 'name', 'price'],
      order: {
        options: {
          group_name: 'DESC',
          additional_price: 'ASC',
        },
      },
    });
    return {
      ...menu,
      options: menu.options.filter((option) => option.is_active),
    };
  }

  getAllMenuCategory() {
    return this.menuService.findAllCategory({
      select: ['id', 'name'],
      order: {
        priority: 'ASC',
      },
    });
  }

  addOrderItem(id: number, item: OrderItemDto) {
    return this.orderService.createOrderItem(id, item);
  }

  async updateOrder(id: number, item: OrderDto): Promise<boolean> {
    const success = await this.orderService.update(id, item);
    await this.orderService.calculate(id);
    return success;
  }

  updateOrderItem(id: number, item: OrderItemDto): Promise<boolean> {
    return this.orderService.updateOrderItem(id, item);
  }

  removeOrderItem(id: number): Promise<boolean> {
    return this.orderService.deleteOrderItem(id);
  }

  completeOrder(id: number, adminId: number): Promise<boolean> {
    return this.orderService.completeOrder(id, adminId);
  }

  cancelOrder(id: number): Promise<boolean> {
    return this.orderService.cancelOrder(id);
  }
}
