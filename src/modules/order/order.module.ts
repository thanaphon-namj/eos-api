import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { OrderItemChoice } from './order-item-choice.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, OrderItemChoice])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
