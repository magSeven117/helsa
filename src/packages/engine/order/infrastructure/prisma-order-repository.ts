import { PrismaClient } from '@helsa/database';
import { PrismaCriteriaConverter } from '@helsa/database/converter';
import { Criteria } from '@helsa/ddd/core/criteria';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Order } from '../domain/order';
import { OrderRepository } from '../domain/order-repository';

export class PrismaOrderRepository implements OrderRepository {
  private converter = new PrismaCriteriaConverter();
  constructor(private readonly client: PrismaClient) {}

  get model() {
    return this.client.order;
  }

  async save(order: Order): Promise<void> {
    const data = order.toPrimitives();
    this.model.upsert({
      where: { id: order.id.value },
      update: {
        type: data.type as any,
        status: data.status as any,
        description: data.description,
      },
      create: {
        id: data.id,
        type: data.type as any,
        status: data.status as any,
        description: data.description,
        appointmentId: data.appointmentId,
      },
    });
  }
  async search(criteria: Criteria): Promise<Order[]> {
    const { include, orderBy, where, skip, take } = this.converter.criteria(criteria);
    const results = await this.model.findMany({ where, include, orderBy, skip, take });
    return results.map((data) => Order.fromPrimitives(data as unknown as Primitives<Order>));
  }
  async get(criteria: Criteria): Promise<Order | null> {
    const { include, where } = this.converter.criteria(criteria);
    const data = await this.model.findFirst({ where, include });
    if (!data) return null;
    return Order.fromPrimitives(data as unknown as Primitives<Order>);
  }
}
