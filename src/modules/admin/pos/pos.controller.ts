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
import { OrderItemDto } from './dto/order.dto';

@Controller('admin/pos')
export class AdminPosController {
  constructor(private adminPosService: AdminPosService) {}

  @Get('inbox')
  getInbox() {
    return this.adminPosService.getInbox();
  }

  @Get('menu')
  getAllMenu() {
    return this.adminPosService.getAllMenu();
  }

  @Get(':code')
  getByCode(@Param('code') code: string) {
    return this.adminPosService.getByCode(code);
  }

  @Get('menu/:id/options')
  getMenuOptions(@Param('id') id: string) {
    return this.adminPosService.getMenuOptions(Number(id));
  }

  @Post('order/:id')
  addOrderItem(@Param('id') id: string, @Body() item: OrderItemDto) {
    return this.adminPosService.addOrderItem(Number(id), item);
  }

  // @Get('order/:id/calculate')
  // calculateOrder(@Param('id') id: string) {
  //   return this.adminPosService.calculateOrder(Number(id));
  // }

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
