import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './modules/user/admin.entity';
import { Order } from './modules/order/order.entity';
import { Menu } from './modules/menu/menu.entity';
import { MenuOption } from './modules/menu/menu-option.entity';
import { MenuCategory } from './modules/menu/menu-category.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
import { MenuModule } from './modules/menu/menu.module';
import { AdminModule } from './modules/admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DB } from './environments';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB.HOST,
      url: DB.URL,
      port: DB.PORT,
      username: DB.USERNAME,
      password: DB.PASSWORD,
      database: DB.NAME,
      entities: [Admin, Order, Menu, MenuOption, MenuCategory],
    }),
    AuthModule,
    UserModule,
    OrderModule,
    MenuModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
