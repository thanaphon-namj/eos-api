import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async findOneBy(where: FindOptionsWhere<Order>): Promise<Order> {
    const order = await this.orderRepository.findOneBy(where);
    if (!order) throw new NotFoundException();
    return order;
  }

  findAll(options?: FindManyOptions<Order>): Promise<Order[]> {
    return this.orderRepository.find(options);
  }

  async cancelOrder(id: number): Promise<any> {
    return this.orderRepository.update(id, {
      status: OrderStatus.Cancelled,
    });
  }
}
