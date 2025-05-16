import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { UserDto } from '../../user/dto/user.dto';

@Injectable()
export class AdminUserService {
  constructor(private userService: UserService) {}

  create(user: UserDto) {
    return this.userService.create(user);
  }

  getAll() {
    return this.userService.findAll();
  }

  update(id: number, user: UserDto) {
    return this.userService.update(id, user);
  }

  delete(id: number) {
    return this.userService.delete(id);
  }
}
