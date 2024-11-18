import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './menu.entity';
import { MenuOption } from './menu-option.entity';
import { MenuCategory } from './menu-category.entity';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, MenuOption, MenuCategory])],
  controllers: [MenusController],
  providers: [MenusService],
  exports: [MenusService],
})
export class MenusModule {}
