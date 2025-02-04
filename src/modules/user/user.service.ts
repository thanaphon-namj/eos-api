import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { AdminDto } from './dto/admin.dto';
import { hashPassword } from '../../utils/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async create(adminDto: AdminDto): Promise<Admin> {
    const admin = new Admin();
    admin.username = adminDto.username;
    admin.password = await hashPassword(adminDto.password);
    admin.name = adminDto.name;
    return this.adminRepository.save(admin);
  }

  async findOneBy(where: FindOptionsWhere<Admin>): Promise<Admin> {
    const admin = await this.adminRepository.findOneBy(where);
    if (!admin) throw new NotFoundException('User not found.');
    return admin;
  }
}
