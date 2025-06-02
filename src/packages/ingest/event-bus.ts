import { DomainEvent, EventBus } from '@helsa/ddd/core/domain-event';
import { client } from '.';
export class InngestEventBus implements EventBus {
  async publish<T>(events: Array<DomainEvent<T>>): Promise<void> {
    const publishes = events.map((event) => ({ name: event.name, data: event.data }));
    await client.send(publishes);
  }
}
