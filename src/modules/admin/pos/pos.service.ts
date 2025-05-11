import { Injectable } from '@nestjs/common';
import { Between } from 'typeorm';
import { OrderService } from '../../order/order.service';
import { MenuService } from '../../menu/menu.service';
import { OrderStatus } from '../../order/order.entity';
import { OrderDto, OrderItemDto } from '../../order/dto/order.dto';
import { QueryDto } from '../order/dto/query.dto';
import { getEndOfDay, getStartOfDay } from '../../../utils/date';

@Injectable()
export class AdminPosService {
  constructor(
    private orderService: OrderService,
    private menuService: MenuService,
  ) {}

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

  getInbox(query: QueryDto) {
    return this.orderService.findAllBy({
      status: query.status,
      created_at: Between(getStartOfDay(), getEndOfDay()),
    });
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
      // เปลี่ยนเป็น choice
      // order: {
      //   options: {
      //     group_name: 'DESC',
      //     additional_price: 'ASC',
      //   },
      // },
    });
    return {
      ...menu,
      // options: menu.options.filter((option) => option.is_active),
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
}
