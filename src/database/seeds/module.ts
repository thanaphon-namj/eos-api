import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../../modules/user/admin.entity';
import { UserSeedModule } from './user/user.module';
import { DB } from '../../environments';

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
      entities: [Admin],
    }),
    UserSeedModule,
  ],
})
export class SeedModule {}
