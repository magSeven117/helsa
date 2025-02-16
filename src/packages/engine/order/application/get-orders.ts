import { Criteria, Filter } from '@helsa/ddd/core/criteria';
import { OrderRepository } from '../domain/order-repository';

export class GetOrders {
  constructor(private readonly repository: OrderRepository) {}

  async run(criteria: Filter[]) {
    const orders = await this.repository.search(Criteria.fromValues(criteria));

    return orders.map((order) => order.toPrimitives());
  }
}
