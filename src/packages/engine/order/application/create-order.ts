import { Primitives } from '@helsa/ddd/types/primitives';
import { Order } from '../domain/order';
import { OrderRepository } from '../domain/order-repository';

export class CreateOrder {
  constructor(private readonly repository: OrderRepository) {}

  async run(data: Primitives<Order>): Promise<void> {
    const order = Order.create(data.id, data.description, data.type, data.status, data.appointmentId);
    await this.repository.save(order);
  }
}
