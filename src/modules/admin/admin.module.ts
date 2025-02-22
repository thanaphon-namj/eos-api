import { Module } from '@nestjs/common';
import { OrderModule } from '../order/order.module';
import { MenuModule } from '../menu/menu.module';
import { AdminController } from './admin.controller';
// import { AdminPosController } from './pos/pos.controller';
import { AdminMenuController } from './menu/menu.controller';
import { AdminService } from './admin.service';
// import { AdminPosService } from './pos/pos.service';
import { AdminMenuService } from './menu/menu.service';

@Module({
  imports: [OrderModule, MenuModule],
  controllers: [AdminController, AdminMenuController],
  providers: [AdminService, AdminMenuService],
})
export class AdminModule {}
