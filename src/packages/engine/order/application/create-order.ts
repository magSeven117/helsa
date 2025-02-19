import { Primitives } from '@helsa/ddd/types/primitives';
import { OrderStatusValues } from '../domain/enum-types';
import { Order } from '../domain/order';
import { OrderRepository } from '../domain/order-repository';

export class CreateOrder {
  constructor(private readonly repository: OrderRepository) {}

  async run(data: Primitives<Order>): Promise<void> {
    const order = Order.create(
      data.id,
      data.description,
      data.type,
      OrderStatusValues.PENDING,
      data.appointmentId,
      data.patientId
    );
    await this.repository.save(order);
  }
}
