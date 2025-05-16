import { Role } from '../admin.entity';

export interface UserDto {
  id?: number;
  username: string;
  password?: string;
  name: string;
  role: Role;
}
