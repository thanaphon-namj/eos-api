import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from '../../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = userDto.username;
    user.password = await hashPassword(userDto.password);
    user.name = userDto.name;
    user.role = Role.Admin;
    return this.userRepository.save(user);
  }

  async findOne(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  update(id: number, user: CreateUserDto): Promise<any> {
    return this.userRepository.update(id, user);
  }

  delete(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }
}
