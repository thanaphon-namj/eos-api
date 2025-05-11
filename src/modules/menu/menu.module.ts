import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './menu.entity';
import { MenuOption } from './menu-option.entity';
import { MenuOptionChoice } from './menu-option-choice.entity';
import { MenuOptionMapping } from './menu-option-mapping.entity';
import { MenuCategory } from './menu-category.entity';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Menu,
      MenuOption,
      MenuOptionChoice,
      MenuOptionMapping,
      MenuCategory,
    ]),
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
