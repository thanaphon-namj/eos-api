import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { comparePassword } from '../../../utils/bcrypt';

@Injectable()
export class AdminAuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(username: string, password: string): Promise<string> {
    const admin = await this.userService.findOneBy({ username });
    if (!(await comparePassword(password, admin.password))) {
      throw new UnauthorizedException('Password invalid.');
    }
    return this.jwtService.signAsync({
      sub: admin.id,
      username: admin.username,
    });
  }

  async getUser(
    id: number,
  ): Promise<{ id: number; username: string; name: string; role: string }> {
    const admin = await this.userService.findOneBy({ id });
    return {
      id: admin.id,
      username: admin.username,
      name: admin.name,
      role: admin.role,
    };
  }
}
