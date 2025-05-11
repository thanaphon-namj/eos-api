import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MenuOptionChoice } from './menu-option-choice.entity';

@Entity({ name: 'MenuOption' })
export class MenuOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  is_required: boolean;

  @Column()
  allow_multiple: boolean;

  @OneToMany(() => MenuOptionChoice, (choice) => choice.option)
  choices: MenuOptionChoice[];
}
