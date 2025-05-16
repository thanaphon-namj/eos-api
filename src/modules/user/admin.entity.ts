import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  Admin = 'admin',
  User = 'user',
}

@Entity({ name: 'Admin' })
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  role: Role;
}
