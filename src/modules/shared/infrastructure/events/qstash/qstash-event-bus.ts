import { DomainEvent, EventBus } from '@/modules/shared/domain/core/DomainEvent';
import { Client } from '@upstash/qstash';

export class QStashEventBus implements EventBus {
  private readonly qstashClient: Client;
  constructor() {
    this.qstashClient = new Client({
      token: process.env.QSTASH_TOKEN,
    });
  }
  async publish(events: DomainEvent[]): Promise<void> {
    await this.qstashClient.batchJSON(
      events.map((event) => ({
        url: `${process.env.QSTASH_APP_URL}/api/webhooks/events/${event.eventName}`,
        body: event.toPrimitive(),
      }))
    );
  }
}
