import {
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AdminOrderService } from './order.service';
import { AuthGuard } from '../auth/auth.guard';
import { QueryDto } from './dto/query.dto';

@Controller('admin/order')
export class AdminOrderController {
  constructor(private adminOrderService: AdminOrderService) {}

  @Get('')
  getAll(@Query() query: QueryDto) {
    return this.adminOrderService.getAll(query);
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.adminOrderService.getOrderById(Number(id));
  }

  @Post(':id/complete')
  @UseGuards(AuthGuard)
  async completeOrder(@Request() req: any, @Param('id') id: string) {
    const success = await this.adminOrderService.completeOrder(
      Number(id),
      req.user.sub,
    );
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async cancelOrder(@Request() req: any, @Param('id') id: string) {
    const success = await this.adminOrderService.cancelOrder(
      Number(id),
      req.user.sub,
    );
    if (success) {
      return { success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }
}
