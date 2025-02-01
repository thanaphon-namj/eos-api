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

@Controller('admin/pos')
export class AdminPosController {
  constructor(private adminPosService: AdminPosService) {}

  @Get('inbox')
  getInbox() {
    return this.adminPosService.getInbox();
  }

  @Get('menu')
  getMenu() {
    return this.adminPosService.getAllMenu();
  }

  @Get('order/:code')
  getOrderByCode(@Param('code') code: string) {
    return this.adminPosService.getOrderByCode(code);
  }

  @Delete('orders/:id')
  cancelOrder(@Param('id') id: string) {
    return this.adminPosService.cancelOrder(+id);
  }

  @Post('orders/:id/items')
  addOrderItem(@Param('id') id: string, @Body() orderItemDto: any) {
    return this.adminPosService.addOrderItem(+id, orderItemDto);
  }

  @Post('orders/:id/discount')
  discountOrder(@Param('id') id: string, @Body() orderDto: any) {
    return this.adminPosService.discountOrder(+id, orderDto);
  }

  @Post('orders/:id/paid')
  paidOrder(@Param('id') id: string, @Body() orderDto: any) {
    return this.adminPosService.paidOrder(+id, orderDto);
  }

  @Put('items/:id')
  updateOrderItem(@Param('id') id: string, @Body() orderItemDto: any) {
    return this.adminPosService.updateOrderItem(+id, orderItemDto);
  }

  @Delete('items/:id')
  async deleteOrderItem(@Param('id') id: string) {
    try {
      await this.adminPosService.deleteOrderItem(+id);
      return { success: true };
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
