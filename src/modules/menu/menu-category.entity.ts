import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  // @Column()
  // priority: number;

  @Column()
  parent_id: number;

  @OneToOne(() => MenuCategory)
  @JoinColumn({ name: 'parent_id' })
  parent: MenuCategory;
}
