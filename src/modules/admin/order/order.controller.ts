import { Controller, Delete, Get, Param, Patch, Query } from '@nestjs/common';
import { AdminOrderService } from './order.service';

@Controller('admin/order')
export class AdminOrderController {
  constructor(private adminOrderService: AdminOrderService) {}

  @Get()
  getAll(@Query() query: any) {
    return this.adminOrderService.getAll(query);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.adminOrderService.getById(+id);
  }

  @Patch(':id/complete')
  completeOrder(@Param('id') id: string) {
    return this.adminOrderService.completeOrder(+id);
  }

  @Delete(':id')
  cancelOrder(@Param('id') id: string) {
    return this.adminOrderService.cancelOrder(+id);
  }
}
