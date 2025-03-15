import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderStatus } from './order.entity';
import { OrderDto, OrderItemDto } from './dto/order.dto';
import { convertToUid } from '../../utils/generate';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async createOrder(@Body() order: OrderDto) {
    const { id } = await this.orderService.create(order);
    return convertToUid(String(id));
  }

  @Post(':id')
  async addOrderItem(@Param('id') id: string, @Body() item: OrderItemDto) {
    const order = await this.orderService.findOne({
      where: {
        id: Number(id),
      },
      select: ['status'],
    });
    if (![OrderStatus.Created, OrderStatus.Pending].includes(order.status)) {
      throw new InternalServerErrorException("Can't add item.");
    } else {
      const success = await this.orderService.createOrderItem(Number(id), item);
      if (order.status === OrderStatus.Created) {
        await this.orderService.update(Number(id), {
          status: OrderStatus.Pending,
        });
      }
      if (success) {
        return { success: true };
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const order = await this.orderService.findOne({
      where: {
        id: Number(id),
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

  @Get(':id/calculate')
  async calculateOrder(@Param('id') id: string) {
    const success = this.orderService.calculate(Number(id));
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Put('item/:id')
  async updateOrderItem(@Param('id') id: string, @Body() item: any) {
    const success = await this.orderService.updateOrderItem(Number(id), item);
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Delete('item/:id')
  removeOrderItem(@Param('id') id: string) {
    return this.orderService.deleteOrderItem(Number(id));
  }

  @Post(':id/confirm')
  async confirmOrder(@Param('id') id: string) {
    const success = await this.orderService.confirmOrder(Number(id));
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async cancelOrder(@Param('id') id: string) {
    const success = await this.orderService.cancelOrder(Number(id));
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }
}
