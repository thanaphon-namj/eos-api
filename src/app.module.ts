import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './modules/admin/users/user.entity';
// import { AdminModule } from './modules/admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { DB } from './environments';

@Module({
  imports: [
    // ConfigModule.forRoot(),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: DB.HOST,
    //   port: DB.PORT,
    //   username: DB.USERNAME,
    //   password: DB.PASSWORD,
    //   database: DB.NAME,
    //   entities: [User],
    // }),
    // AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
