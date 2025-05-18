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
import { AdminPosService } from './pos.service';
import { OrderDto, OrderItemDto } from '../../order/dto/order.dto';
import { QueryDto } from '../order/dto/query.dto';

@Controller('admin/pos')
export class AdminPosController {
  constructor(private adminPosService: AdminPosService) {}

  @Get()
  getStats() {
    return this.adminPosService.getStats();
  }

  @Get('inbox')
  getInbox(@Query() query: QueryDto) {
    return this.adminPosService.getInbox(query);
  }

  @Post('order/:id')
  addOrderItem(@Param('id') id: string, @Body() item: OrderItemDto) {
    return this.adminPosService.addOrderItem(Number(id), item);
  }

  @Put('order/:id')
  async updateOrder(@Param('id') id: string, @Body() order: OrderDto) {
    const success = await this.adminPosService.updateOrder(Number(id), order);
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Put('item/:id')
  async updateOrderItem(@Param('id') id: string, @Body() item: OrderItemDto) {
    const success = await this.adminPosService.updateOrderItem(
      Number(id),
      item,
    );
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Delete('item/:id')
  async removeOrderItem(@Param('id') id: string) {
    const success = await this.adminPosService.removeOrderItem(Number(id));
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }
}
