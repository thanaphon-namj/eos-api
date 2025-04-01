import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'MenuCategory' })
export class MenuCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image_url: string;

  @Column()
  banner_url: string;

  @Column()
  priority: number;
}
