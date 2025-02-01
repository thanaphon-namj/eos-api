import { Controller, Get, Query } from '@nestjs/common';
import { AdminTrackingService } from './tracking.service';

@Controller('admin/order')
export class AdminTrackingController {
  constructor(private adminTrackingService: AdminTrackingService) {}

  @Get()
  getAll(@Query() query: any) {
    return this.adminTrackingService.getAll(query.statuses);
  }
}
