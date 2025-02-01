import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { And, In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { OrderItem } from './order-items.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  findAll(query: any) {
    return this.orderRepository.find({
      where: {
        created_at: And(
          MoreThanOrEqual(query.startDate),
          LessThanOrEqual(query.endDate),
        ),
        status: query.status,
      },
    });
  }

  findAllByStatus(status: OrderStatus): Promise<Order[]> {
    return this.orderRepository.find({
      where: {
        status,
      },
      select: ['id', 'code', 'name', 'created_at'],
    });
  }

  findAllByStatuses(statuses: OrderStatus[]): Promise<Order[]> {
    return this.orderRepository.find({
      where: {
        status: In(statuses),
      },
    });
  }

  async findByCode(code: string): Promise<any> {
    const order = await this.orderRepository.findOneBy({
      code,
      status: OrderStatus.Confirmed,
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  cancelOrder(id: number): Promise<any> {
    return this.orderRepository.update(id, {
      status: OrderStatus.Cancelled,
    });
  }

  async discountOrder(id: number, orderDto: any): Promise<any> {
    const order = await this.orderRepository.findOneBy({ id });
    return this.orderRepository.update(id, {
      discount: orderDto.discount,
      total: order.total - orderDto.discount,
    });
  }

  paidOrder(id: number, orderDto: any): Promise<any> {
    return this.orderRepository.update(id, {
      payment: orderDto.payment,
      status: OrderStatus.Completed,
    });
  }

  async addOrderItem(id: number, orderItemDto: any): Promise<any> {
    const orderItem = new OrderItem();
    orderItem.variant = orderItemDto.variant;
    orderItem.price = orderItemDto.price;
    orderItem.quantity = orderItemDto.quantity;
    orderItem.total = orderItemDto.price * orderItemDto.quantity;
    orderItem.order_id = orderItemDto.order_id;
    orderItem.menu_id = orderItemDto.menu_id;
    await this.orderItemRepository.save(orderItem);
    return this.calculate(orderItemDto.order_id);
  }

  async updateOrderItem(id: number, orderItemDto: any): Promise<any> {
    await this.orderItemRepository.update(id, {
      ...orderItemDto,
      total: orderItemDto.price * orderItemDto.quantity,
    });
    return this.calculate(orderItemDto.order_id);
  }

  async deleteOrderItem(id: number): Promise<any> {
    await this.orderItemRepository.delete(id);
    const orderItem = await this.orderItemRepository.findOneBy({ id });
    return this.calculate(orderItem.order_id);
  }

  async calculate(orderId: number): Promise<any> {
    const total = await this.orderItemRepository.sum('total', {
      order_id: orderId,
    });
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
      select: ['discount'],
    });
    return this.orderRepository.update(orderId, {
      total: total - order.discount,
    });
  }
}
