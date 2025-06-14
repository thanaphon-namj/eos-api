import { Controller, Get, Query } from '@nestjs/common';
import { AdminPosService } from './pos.service';
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
}
