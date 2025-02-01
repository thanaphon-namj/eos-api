import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() order: any) {
    // return this.ordersService.create(order);
    return '';
  }

  @Get()
  getOrder() {
    return 'Get order';
  }

  @Post('/items')
  addOrderItem() {
    return 'Add order item';
  }

  @Put('/items/:itemId')
  updateOrderItem(@Param('itemId') itemId: string) {
    return `Update order item by id: ${itemId}`;
  }

  @Delete('/items/:itemId')
  deleteOrderItem(@Param('itemId') itemId: string) {
    return `Delete order item by id: ${itemId}`;
  }
}
