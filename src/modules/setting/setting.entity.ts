import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Setting' })
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;
}
