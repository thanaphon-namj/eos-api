import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SECRET_KEY } from '../../environments';

@Module({
  imports: [
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
