import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { UserDto } from '../../user/dto/user.dto';

@Injectable()
export class AdminUserService {
  constructor(private userService: UserService) {}

  create(user: UserDto) {
    return this.userService.create(user);
  }
}
