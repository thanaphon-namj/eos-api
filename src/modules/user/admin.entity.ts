import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  role: string;
}
