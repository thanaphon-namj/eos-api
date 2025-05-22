import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { In } from 'typeorm';
import { OrderService } from './order.service';
import { OrderDto, OrderItemDto } from './dto/order.dto';
import { QueryDto } from './dto/query.dto';
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

  @Get('history')
  async getAll(@Query() query: QueryDto) {
    return this.orderService.findAll({
      where: {
        id: In(query.id),
      },
      relations: ['items'],
      select: {
        id: true,
        code: true,
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
    });
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.orderService.findOne({
      where: {
        id: Number(id),
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
              option_id: true,
            },
          },
        },
      },
    });
  }

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
