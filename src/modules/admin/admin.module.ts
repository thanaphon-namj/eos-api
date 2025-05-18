import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { OrderModule } from '../order/order.module';
import { MenuModule } from '../menu/menu.module';
import { SettingModule } from '../setting/setting.module';
import { UserModule } from '../user/user.module';
import { AdminController } from './admin.controller';
import { AdminAuthController } from './auth/auth.controller';
import { AdminPosController } from './pos/pos.controller';
import { AdminMenuController } from './menu/menu.controller';
import { AdminOrderController } from './order/order.controller';
import { AdminSettingController } from './setting/setting.controller';
import { AdminUserController } from './user/user.controller';
import { AdminService } from './admin.service';
import { AdminAuthService } from './auth/auth.service';
import { AdminPosService } from './pos/pos.service';
import { AdminOrderService } from './order/order.service';
import { AdminMenuService } from './menu/menu.service';
import { AdminSettingService } from './setting/setting.service';
import { AdminUserService } from './user/user.service';
import { SECRET_KEY } from '../../environments';

@Module({
  imports: [
    JwtModule.register({
      secret: SECRET_KEY,
      global: true,
      signOptions: {
        expiresIn: '365d',
      },
    }),
    OrderModule,
    MenuModule,
    SettingModule,
    UserModule,
  ],
  controllers: [
    AdminController,
    AdminAuthController,
    AdminPosController,
    AdminOrderController,
    AdminMenuController,
    AdminSettingController,
    AdminUserController,
  ],
  providers: [
    AdminService,
    AdminAuthService,
    AdminPosService,
    AdminOrderService,
    AdminMenuService,
    AdminSettingService,
    AdminUserService,
  ],
})
export class AdminModule {}
