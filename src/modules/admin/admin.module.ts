import { Module } from '@nestjs/common';
import { OrdersModule } from '../orders/orders.module';
import { AdminService } from './admin.service';
import { AdminPosService } from './pos/pos.service';
import { AdminController } from './admin.controller';
import { AdminPosController } from './pos/pos.controller';

@Module({
  imports: [OrdersModule],
  providers: [AdminService, AdminPosService],
  controllers: [AdminController, AdminPosController],
})
export class AdminModule {}
