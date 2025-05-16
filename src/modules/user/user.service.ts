import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { UserDto } from './dto/user.dto';
import { hashPassword } from '../../utils/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async create(user: UserDto): Promise<Admin> {
    const admin = new Admin();
    admin.username = user.username;
    admin.password = await hashPassword(user.password);
    admin.name = user.name;
    admin.role = user.role;
    return this.adminRepository.save(admin);
  }

  findAll() {
    return this.adminRepository.find({
      select: ['id', 'username', 'name', 'role'],
    });
  }

  findOne(where: FindOneOptions<Admin>): Promise<Admin> {
    return this.adminRepository.findOne(where);
  }

  async update(id: number, user: UserDto): Promise<any> {
    if (user.password) user.password = await hashPassword(user.password);
    const result = await this.adminRepository.update(id, user);
    return result.affected > 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.adminRepository.delete(id);
    return result.affected > 0;
  }
}
