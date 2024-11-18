import { Module } from '@nestjs/common';
import { OrdersModule } from '../orders/orders.module';
import { MenusModule } from '../menus/menus.module';
import { AdminController } from './admin.controller';
import { AdminPosController } from './pos/pos.controller';
import { AdminMenuController } from './menu/menu.controller';
import { AdminService } from './admin.service';
import { AdminPosService } from './pos/pos.service';
import { AdminMenuService } from './menu/menu.service';

@Module({
  imports: [OrdersModule, MenusModule],
  controllers: [AdminController, AdminPosController, AdminMenuController],
  providers: [AdminService, AdminPosService, AdminMenuService],
})
export class AdminModule {}
