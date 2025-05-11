import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { OrderModule } from '../order/order.module';
import { MenuModule } from '../menu/menu.module';
import { UserModule } from '../user/user.module';
import { AdminController } from './admin.controller';
import { AdminAuthController } from './auth/auth.controller';
import { AdminPosController } from './pos/pos.controller';
import { AdminMenuController } from './menu/menu.controller';
import { AdminOrderController } from './order/order.controller';
import { AdminUserController } from './user/user.controller';
import { AdminService } from './admin.service';
import { AdminAuthService } from './auth/auth.service';
import { AdminPosService } from './pos/pos.service';
import { AdminOrderService } from './order/order.service';
import { AdminMenuService } from './menu/menu.service';
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
    UserModule,
  ],
  controllers: [
    AdminController,
    AdminAuthController,
    AdminPosController,
    AdminOrderController,
    AdminMenuController,
    AdminUserController,
  ],
  providers: [
    AdminService,
    AdminAuthService,
    AdminPosService,
    AdminOrderService,
    AdminMenuService,
    AdminUserService,
  ],
})
export class AdminModule {}
