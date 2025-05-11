import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SECRET_KEY } from '../../../environments';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) throw new UnauthorizedException('Token not found.');
    try {
      request.user = await this.jwtService.verifyAsync(token, {
        secret: SECRET_KEY,
      });
    } catch {
      throw new UnauthorizedException('Token invalid.');
    }
    return true;
  }
}
