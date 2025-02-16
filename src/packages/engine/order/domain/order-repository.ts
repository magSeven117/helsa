import { Criteria } from '@helsa/ddd/core/criteria';
import { Order } from './order';

export interface OrderRepository {
  save(order: Order): Promise<void>;
  search(criteria: Criteria): Promise<Order[]>;
  get(criteria: Criteria): Promise<Order | null>;
}
