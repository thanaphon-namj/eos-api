import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/user.entity';
import { Order } from './modules/orders/order.entity';
import { OrderItem } from './modules/orders/order-items.entity';
import { Menu } from './modules/menus/menu.entity';
import { MenuOption } from './modules/menus/menu-option.entity';
import { MenuCategory } from './modules/menus/menu-category.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OrdersModule } from './modules/orders/orders.module';
import { MenusModule } from './modules/menus/menus.module';
import { AdminModule } from './modules/admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DB } from './environments';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB.HOST,
      port: DB.PORT,
      username: DB.USERNAME,
      password: DB.PASSWORD,
      database: DB.NAME,
      entities: [User, Order, OrderItem, Menu, MenuOption, MenuCategory],
    }),
    AuthModule,
    UsersModule,
    OrdersModule,
    MenusModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
