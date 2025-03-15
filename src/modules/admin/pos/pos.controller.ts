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
import { AdminPosService } from './pos.service';
import { OrderDto, OrderItemDto } from '../../order/dto/order.dto';

@Controller('admin/pos')
export class AdminPosController {
  constructor(private adminPosService: AdminPosService) {}

  @Get('inbox')
  getInbox() {
    return this.adminPosService.getInbox();
  }

  @Get('menu')
  async getAllMenu() {
    const categories = await this.adminPosService.getAllMenuCategory();
    const items = await this.adminPosService.getAllMenu();
    return {
      categories,
      items,
    };
  }

  @Get('menu/:id')
  getMenuById(@Param('id') id: string) {
    return this.adminPosService.getMenuById(Number(id));
  }

  @Get(':code')
  getOrderByCode(@Param('code') code: string) {
    return this.adminPosService.getOrderByCode(code);
  }

  @Get('order/:id')
  getOrderById(@Param('id') id: string) {
    return this.adminPosService.getOrderById(Number(id));
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

  @Post('order/:id/complete')
  async completeOrder(@Param('id') id: string, @Body() order: OrderDto) {
    const success = await this.adminPosService.completeOrder(
      Number(id),
      order.admin_id,
    );
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Delete('order/:id')
  async cancelOrder(@Param('id') id: string) {
    const success = await this.adminPosService.cancelOrder(Number(id));
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }
}
