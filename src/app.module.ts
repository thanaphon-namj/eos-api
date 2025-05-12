import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './modules/user/admin.entity';
import { Order } from './modules/order/order.entity';
import { OrderItem } from './modules/order/order-item.entity';
import { OrderItemChoice } from './modules/order/order-item-choice.entity';
import { Menu } from './modules/menu/menu.entity';
import { MenuOption } from './modules/menu/menu-option.entity';
import { MenuOptionChoice } from './modules/menu/menu-option-choice.entity';
import { MenuOptionMapping } from './modules/menu/menu-option-mapping.entity';
import { MenuCategory } from './modules/menu/menu-category.entity';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
import { MenuModule } from './modules/menu/menu.module';
import { AdminModule } from './modules/admin/admin.module';
import { UploadModule } from './modules/upload/upload.module';
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
      ssl: {
        rejectUnauthorized: false,
        ca: DB.SSL.CA,
      },
      entities: [
        Admin,
        Order,
        OrderItem,
        OrderItemChoice,
        Menu,
        MenuOption,
        MenuOptionChoice,
        MenuOptionMapping,
        MenuCategory,
      ],
    }),
    UserModule,
    OrderModule,
    MenuModule,
    AdminModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
