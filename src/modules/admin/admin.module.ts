import { Module } from '@nestjs/common';
import { OrderModule } from '../order/order.module';
import { MenuModule } from '../menu/menu.module';
import { UserModule } from '../user/user.module';
import { AdminController } from './admin.controller';
import { AdminPosController } from './pos/pos.controller';
import { AdminMenuController } from './menu/menu.controller';
import { AdminUserController } from './user/user.controller';
import { AdminService } from './admin.service';
import { AdminPosService } from './pos/pos.service';
import { AdminMenuService } from './menu/menu.service';
import { AdminUserService } from './user/user.service';

@Module({
  imports: [OrderModule, MenuModule, UserModule],
  controllers: [
    AdminController,
    AdminPosController,
    AdminMenuController,
    AdminUserController,
  ],
  providers: [
    AdminService,
    AdminPosService,
    AdminMenuService,
    AdminUserService,
  ],
})
export class AdminModule {}
