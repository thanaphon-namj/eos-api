import { Controller, Get, Param } from '@nestjs/common';
import { AdminPosService } from './pos.service';

@Controller('admin/pos')
export class AdminPosController {
  constructor(private adminPosService: AdminPosService) {}

  @Get('/inbox')
  getInbox() {
    return this.adminPosService.getInbox();
  }

  @Get('/:code')
  getOrderByCode(@Param('code') code: string) {
    return this.adminPosService.getOrderByCode(code);
  }
}
