import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { OrderItem } from './order-item.entity';
import { OrderItemChoice } from './order-item-choice.entity';
import { Schedule, ScheduleStatus } from '../task/schedule.entity';
import { OrderDto, OrderItemDto } from './dto/order.dto';
import { generateCode } from '../../utils/generate';
import { compareArray } from '../../utils/array';
import { addMinutes, getEndOfDay, getStartOfDay, now } from '../../utils/date';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(OrderItemChoice)
    private orderItemChoiceRepository: Repository<OrderItemChoice>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async create(orderDto: OrderDto): Promise<Order> {
    const previous = await this.orderRepository.findOne({
      where: {
        created_at: Between(getStartOfDay(), getEndOfDay()),
      },
      select: ['code'],
      order: {
        code: 'DESC',
      },
    });
    const order = new Order();
    order.code = generateCode(previous ? previous.code : '0');
    order.name = orderDto.name;
    order.status = OrderStatus.Pending;
    order.created_at = now();
    const result = await this.orderRepository.save(order);
    await this.createTask(result.id);
    return result;
  }

  findAll(options?: FindManyOptions<Order>): Promise<Order[]> {
    return this.orderRepository.find(options);
  }

  getPaginated(options: FindManyOptions<Order>): Promise<[Order[], number]> {
    return this.orderRepository.findAndCount(options);
  }

  findOne(options: FindOneOptions<Order>): Promise<Order> {
    return this.orderRepository.findOne(options);
  }

  async confirm(id: number): Promise<boolean> {
    const result = await this.orderRepository.update(id, {
      status: OrderStatus.Confirmed,
      updated_at: now(),
    });
    await this.calculate(id);
    await this.scheduleRepository.delete({ order_id: id });
    return result.affected > 0;
  }

  async complete(id: number, adminId?: number): Promise<boolean> {
    const result = await this.orderRepository.update(id, {
      status: OrderStatus.Completed,
      admin_id: adminId,
    });
    return result.affected > 0;
  }

  async discount(id: number, discount: number): Promise<boolean> {
    const result = await this.orderRepository.update(id, {
      discount,
    });
    await this.calculate(id);
    return result.affected > 0;
  }

  async cancel(id: number, adminId?: number): Promise<boolean> {
    const order = {
      status: OrderStatus.Cancelled,
    };
    if (adminId) order['admin_id'] = adminId;
    const result = await this.orderRepository.update(id, order);
    return result.affected > 0;
  }

  async createItem(id: number, menu: OrderItemDto): Promise<boolean> {
    const exist = await this.orderItemRepository.find({
      where: {
        order_id: id,
        menu_id: menu.id,
        note: menu.note,
      },
      relations: ['choices'],
      select: ['id', 'choices'],
    });
    const matched = exist.find((item) => {
      const choiceIds = item.choices.map((choice) => choice.choice_id);
      return compareArray(choiceIds, menu.choices);
    });
    if (matched) {
      await this.orderItemRepository.increment(
        {
          id: matched.id,
        },
        'quantity',
        menu.quantity,
      );
    } else {
      const result = await this.newItem(id, menu);
      for await (const choiceId of menu.choices) {
        await this.createItemChoice(result.id, choiceId);
      }
    }
    return this.calculate(id);
  }

  newItem(id: number, menu: OrderItemDto): Promise<OrderItem> {
    const orderItem = new OrderItem();
    orderItem.quantity = menu.quantity;
    orderItem.note = menu.note;
    orderItem.order_id = id;
    orderItem.menu_id = menu.id;
    return this.orderItemRepository.save(orderItem);
  }

  createItemChoice(id: number, choiceId: number): Promise<OrderItemChoice> {
    const orderItemChoice = new OrderItemChoice();
    orderItemChoice.item_id = id;
    orderItemChoice.choice_id = choiceId;
    return this.orderItemChoiceRepository.save(orderItemChoice);
  }

  async updateItem(id: number, menu: OrderItemDto): Promise<boolean> {
    const exist = await this.orderItemChoiceRepository.find({
      where: {
        item_id: id,
      },
      select: ['choice_id'],
    });
    const choiceIds = exist.map((choice) => choice.choice_id);
    if (!compareArray(choiceIds, menu.choices)) {
      await this.orderItemChoiceRepository.delete({ item_id: id });
      for await (const choiceId of menu.choices) {
        await this.createItemChoice(id, choiceId);
      }
    }
    const result = await this.orderItemRepository.update(id, {
      quantity: menu.quantity,
      note: menu.note,
    });
    const { order_id } = await this.orderItemRepository.findOne({
      where: {
        id,
      },
      select: ['order_id'],
    });
    await this.calculate(order_id);
    return result.affected > 0;
  }

  async deleteItem(id: number): Promise<boolean> {
    const { order_id } = await this.orderItemRepository.findOne({
      where: {
        id,
      },
      select: ['order_id'],
    });
    const result = await this.orderItemRepository.delete(id);
    await this.calculate(order_id);
    return result.affected > 0;
  }

  async calculate(id: number): Promise<boolean> {
    const items = await this.orderItemRepository.find({
      where: {
        order_id: id,
      },
      relations: ['menu', 'choices', 'choices.choice'],
      select: {
        id: true,
        quantity: true,
        menu: {
          price: true,
        },
        choices: {
          choice_id: true,
          choice: {
            additional_price: true,
          },
        },
      },
    });
    for await (const item of items) {
      const additional_price = item.choices.reduce((previous, current) => {
        return previous + current.choice.additional_price;
      }, 0);
      const price = item.menu.price + additional_price;
      await this.orderItemRepository.update(item.id, {
        total: price * item.quantity,
      });
    }
    let subTotal = await this.orderItemRepository.sum('total', {
      order_id: id,
    });
    if (!subTotal) subTotal = 0;
    const order = await this.orderRepository.findOne({
      where: {
        id,
      },
      select: ['discount'],
    });
    const total = subTotal - order.discount;
    const result = await this.orderRepository.update(id, {
      subtotal: subTotal,
      total,
    });
    return result.affected > 0;
  }

  createTask(id: number) {
    const schedule = new Schedule();
    schedule.execute_time = addMinutes(15).format('YYYY-MM-DD HH:mm:ss');
    schedule.status = ScheduleStatus.Pending;
    schedule.order_id = id;
    return this.scheduleRepository.save(schedule);
  }
}
