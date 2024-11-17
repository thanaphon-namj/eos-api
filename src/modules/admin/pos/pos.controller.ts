import { Controller, Get, Param } from '@nestjs/common';
import { AdminPosService } from './pos.service';

@Controller('admin/pos')
export class AdminPosController {
  constructor(private adminPosService: AdminPosService) {}

  @Get('/inbox')
  getInbox() {
    return this.adminPosService.getInbox();
  }

  @Get('/order/:referenceCode')
  getOrderByReferenceCode(@Param('referenceCode') referenceCode: string) {
    return this.adminPosService.getOrderByReferenceCode(referenceCode);
  }
}
