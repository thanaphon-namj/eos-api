import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async findByReferenceCode(referenceCode: string): Promise<any> {
    const order = await this.orderRepository.findOneBy({
      reference_code: referenceCode,
      status: OrderStatus.Confirmed,
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  findAllByStatus(status: OrderStatus): Promise<Order[]> {
    return this.orderRepository.find({
      where: {
        status,
      },
      select: ['id', 'reference_code', 'name', 'created_at'],
    });
  }

  async cancelOrder(id: number): Promise<any> {
    return this.orderRepository.update(id, {
      status: OrderStatus.Cancelled,
    });
  }
}
