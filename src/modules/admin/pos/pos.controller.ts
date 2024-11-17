import { Controller, Get } from '@nestjs/common';
import { AdminPosService } from './pos.service';

@Controller('admin/pos')
export class AdminPosController {
  constructor(private adminPosService: AdminPosService) {}

  @Get('/inbox')
  getInbox() {
    return this.adminPosService.getInbox();
  }
}
