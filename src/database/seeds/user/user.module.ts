import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../../../modules/user/admin.entity';
import { UserSeedService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  providers: [UserSeedService],
  exports: [UserSeedService],
})
export class UserSeedModule {}
