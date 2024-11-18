import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'MenuCategory' })
export class MenuCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
