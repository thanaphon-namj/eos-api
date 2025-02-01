import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { generateCode } from '../../utils/generate';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  create(orderDto: any): Promise<any> {
    const order = new Order();
    order.code = generateCode();
    order.status = OrderStatus.Created;
    order.created_at = new Date();
    return this.orderRepository.save(order);
  }
}
