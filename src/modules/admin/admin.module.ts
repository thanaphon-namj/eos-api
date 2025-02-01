import { Module } from '@nestjs/common';
import { OrdersModule } from '../orders/orders.module';
import { MenusModule } from '../menus/menus.module';
import { UsersModule } from '../users/users.module';
import { AdminController } from './admin.controller';
import { AdminPosController } from './pos/pos.controller';
import { AdminMenuController } from './menu/menu.controller';
import { AdminOrderController } from './order/order.controller';
import { AdminTrackingController } from './tracking/tracking.controller';
import { AdminUserController } from './user/user.controller';
import { AdminMarketingController } from './marketing/marketing.controller';
import { AdminService } from './admin.service';
import { AdminPosService } from './pos/pos.service';
import { AdminMenuService } from './menu/menu.service';
import { AdminOrderService } from './order/order.service';
import { AdminTrackingService } from './tracking/tracking.service';
import { AdminUserService } from './user/user.service';
import { AdminMarketingService } from './marketing/marketing.service';

@Module({
  imports: [OrdersModule, MenusModule, UsersModule],
  controllers: [
    AdminController,
    AdminPosController,
    AdminMenuController,
    AdminOrderController,
    AdminTrackingController,
    AdminUserController,
    AdminMarketingController,
  ],
  providers: [
    AdminService,
    AdminPosService,
    AdminMenuService,
    AdminOrderService,
    AdminTrackingService,
    AdminUserService,
    AdminMarketingService,
  ],
})
export class AdminModule {}
