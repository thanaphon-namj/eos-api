import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { OrderItem } from './order-item.entity';
import { ItemVariant } from './item-variant.entity';
import { OrderDto } from './dto/order.dto';
import { OrderItemDto } from '../admin/pos/dto/order.dto';
import { generateCode } from '../../utils/generate';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(ItemVariant)
    private itemVariantRepository: Repository<ItemVariant>,
  ) {}

  create(orderDto: OrderDto) {
    const order = new Order();
    order.code = generateCode();
    order.name = orderDto.name;
    order.status = OrderStatus.Created;
    order.created_at = new Date();
    return this.orderRepository.save(order);
  }

  findAll(options?: FindManyOptions<Order>): Promise<Order[]> {
    return this.orderRepository.find(options);
  }

  findOne(options: FindOneOptions<Order>): Promise<Order> {
    return this.orderRepository.findOne(options);
  }

  async findOneBy(where: FindOptionsWhere<Order>): Promise<Order> {
    const order = await this.orderRepository.findOneBy(where);
    if (!order) throw new NotFoundException();
    return order;
  }

  async confirmOrder(id: number): Promise<boolean> {
    const result = await this.orderRepository.update(id, {
      status: OrderStatus.Confirmed,
      updated_at: new Date(),
    });
    return result.affected > 0;
  }

  async cancelOrder(id: number): Promise<boolean> {
    const result = await this.orderRepository.update(id, {
      status: OrderStatus.Cancelled,
    });
    return result.affected > 0;
  }

  async createOrderItem(id: number, item: OrderItemDto) {
    const orderItem = new OrderItem();
    orderItem.quantity = item.quantity;
    orderItem.note = item.note;
    orderItem.order_id = id;
    orderItem.menu_id = item.id;
    const result = await this.orderItemRepository.save(orderItem);
    if (item.options) {
      for await (const option of item.options) {
        const itemVariant = new ItemVariant();
        itemVariant.item_id = result.id;
        itemVariant.option_id = option;
        await this.itemVariantRepository.save(itemVariant);
      }
    }
    await this.orderRepository.update(id, { status: OrderStatus.Pending });
    return result;
  }

  async updateOrderItem(id: number, item: OrderItemDto): Promise<boolean> {
    if (item.options) {
      await this.itemVariantRepository.delete({ item_id: id });
      for await (const option of item.options) {
        const itemVariant = new ItemVariant();
        itemVariant.item_id = id;
        itemVariant.option_id = option;
        await this.itemVariantRepository.save(itemVariant);
      }
    }
    const result = await this.orderItemRepository.update(id, {
      quantity: item.quantity,
      note: item.note,
    });
    return result.affected > 0;
  }

  async deleteOrderItem(id: number): Promise<boolean> {
    const result = await this.orderItemRepository.delete(id);
    return result.affected > 0;
  }

  async calculate(id: number): Promise<any> {
    const items = await this.orderItemRepository.find({
      where: { order_id: id },
      relations: ['menu'],
      select: {
        id: true,
        quantity: true,
        menu: { price: true },
      },
    });
    const itemIds = items.map((item) => item.id);
    const options = await this.itemVariantRepository.find({
      where: {
        item_id: In(itemIds),
      },
      relations: ['option'],
      select: {
        id: true,
        item_id: true,
        option: { additional_price: true },
      },
    });
    const optionsByItemId = options.reduce((previous, current) => {
      if (!previous[current.item_id]) previous[current.item_id] = [];
      previous[current.item_id].push(current);
      return previous;
    }, {});
    const updatePromises = items.map((item) => {
      let price = item.menu.price;
      const itemOptions = optionsByItemId[item.id] || [];
      price += itemOptions.reduce(
        (previous: any, current: { option: { additional_price: any } }) =>
          previous + current.option.additional_price,
        0,
      );
      return this.orderItemRepository.update(item.id, {
        total: price * item.quantity,
      });
    });
    await Promise.all(updatePromises);
    const total = await this.orderItemRepository.sum('total', { order_id: id });
    const result = await this.orderRepository.update(id, { total });
    return result.affected > 0;
  }
}
