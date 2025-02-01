import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';

@Injectable()
export class AdminUserService {
  constructor(private usersService: UsersService) {}

  create(user: CreateUserDto) {
    return this.usersService.create(user);
  }

  getAll() {
    return this.usersService.findAll();
  }

  update(id: number, user: CreateUserDto) {
    return this.usersService.update(id, user);
  }

  delete(id: number) {
    return this.usersService.delete(id);
  }
}
