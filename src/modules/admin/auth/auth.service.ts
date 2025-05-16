import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { comparePassword } from '../../../utils/bcrypt';

@Injectable()
export class AdminAuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(username: string, password: string) {
    const admin = await this.userService.findOne({
      where: { username },
      select: ['id', 'username', 'password'],
    });
    if (!(await comparePassword(password, admin.password))) {
      throw new UnauthorizedException('Password invalid.');
    }
    return this.jwtService.signAsync({
      sub: admin.id,
      username: admin.username,
    });
  }

  async getUser(id: number) {
    const admin = await this.userService.findOne({
      where: { id },
      select: ['id', 'username', 'name', 'role'],
    });
    if (!admin) throw new NotFoundException('User not found.');
    return admin;
  }
}
