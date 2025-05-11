import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../../../modules/user/admin.entity';
import { hashPassword } from '../../../utils/bcrypt';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async run() {
    const admin = new Admin();
    admin.username = 'admin';
    admin.password = await hashPassword('1234');
    admin.name = 'Administrator';
    admin.role = 'admin';
    return this.adminRepository.save(admin);
  }
}
