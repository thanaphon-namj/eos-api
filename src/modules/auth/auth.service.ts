import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { comparePassword } from '../../utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}
  async login(username: string, password: string): Promise<string> {
    const user = await this.usersService.findOne(username);
    if (!(await comparePassword(password, user.password))) {
      throw new UnauthorizedException('Invalid password');
    }
    return await this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
    });
  }
}
