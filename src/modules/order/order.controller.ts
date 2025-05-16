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
import { OrderDto, OrderItemDto } from './dto/order.dto';
import { convertToUid } from '../../utils/generate';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async create(@Body() order: OrderDto) {
    const { id } = await this.orderService.create(order);
    return convertToUid(String(id));
  }

  @Post(':id')
  async addItem(@Param('id') id: string, @Body() item: OrderItemDto) {
    const success = await this.orderService.createItem(Number(id), item);
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
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
          // menu: {
          //   id: true,
          //   name: true,
          // },
          // options: {
          //   id: true,
          //   item_id: true,
          //   option_id: true,
          //   option: {
          //     id: true,
          //     name: true,
          //   },
          // },
        },
      },
    });
    return {
      ...order,
      items: order.items.map((item) => ({
        ...item,
        // options: item.options.map((option) => option.option),
        // เปลี่ยนเป็น choice
      })),
    };
  }

  // @Get(':id/calculate')
  // async calculate(@Param('id') id: string) {
  //   const success = this.orderService.calculate(Number(id));
  //   if (success) {
  //     return { success: true };
  //   } else {
  //     throw new InternalServerErrorException();
  //   }
  // }

  @Put('item/:id')
  async updateItem(@Param('id') id: string, @Body() item: any) {
    const success = await this.orderService.updateItem(Number(id), item);
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Delete('item/:id')
  removeItem(@Param('id') id: string) {
    return this.orderService.deleteItem(Number(id));
  }

  @Post(':id/confirm')
  async confirm(@Param('id') id: string) {
    const success = await this.orderService.confirm(Number(id));
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async cancel(@Param('id') id: string) {
    const success = await this.orderService.cancel(Number(id));
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }
}
