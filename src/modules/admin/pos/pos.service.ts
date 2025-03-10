import { Injectable } from '@nestjs/common';
import { OrderService } from '../../order/order.service';
import { MenuService } from 'src/modules/menu/menu.service';
import { Order, OrderStatus } from '../../order/order.entity';
import { OrderItemDto } from './dto/order.dto';

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
      select: ['id', 'code', 'name'],
      order: {
        updated_at: 'DESC',
      },
    });
  }

  getByCode(code: string): Promise<Order> {
    return this.orderService.findOneBy({
      code,
      status: OrderStatus.Confirmed,
    });
  }

  async getAllMenu() {
    const items = await this.menuService.findAll({
      where: {
        is_active: true,
      },
      relations: ['category'],
      select: ['id', 'name', 'name_en', 'price'],
      order: {
        category: {
          priority: 'ASC',
        },
      },
    });
    return items.reduce((previous, current) => {
      const exist = previous.find((item) => item.id === current.category.id);
      if (exist) {
        exist.items.push({
          id: current.id,
          name: current.name,
          name_en: current.name_en,
          price: current.price,
        });
      } else {
        previous.push({
          id: current.category.id,
          name: current.category.name,
          items: [
            {
              id: current.id,
              name: current.name,
              name_en: current.name_en,
              price: current.price,
            },
          ],
        });
      }
      return previous;
    }, []);
  }

  async getMenuOptions(id: number) {
    const options = await this.menuService.findAllOption({
      where: {
        menu_id: id,
        is_active: true,
      },
      select: ['id', 'name', 'additional_price', 'group_name'],
      order: {
        group_name: 'DESC',
        additional_price: 'ASC',
      },
    });
    return options.reduce((previous, current) => {
      const exist = previous.find((item) => item.name === current.group_name);
      if (exist) {
        exist.items.push({
          id: current.id,
          name: current.name,
          additional_price: current.additional_price,
        });
      } else {
        previous.push({
          name: current.group_name,
          items: [
            {
              id: current.id,
              name: current.name,
              additional_price: current.additional_price,
            },
          ],
        });
      }
      return previous;
    }, []);
  }

  addOrderItem(id: number, item: OrderItemDto) {
    return this.orderService.createOrderItem(id, item);
  }

  updateOrderItem(id: number, item: OrderItemDto): Promise<boolean> {
    return this.orderService.updateOrderItem(id, item);
  }

  removeOrderItem(id: number): Promise<boolean> {
    return this.orderService.deleteOrderItem(id);
  }

  // calculateOrder(id: number) {
  //   return this.orderService.calculate(id);
  // }
}
