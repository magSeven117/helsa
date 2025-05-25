import { DomainEvent, EventBus } from '@helsa/ddd/core/domain-event';
import { Client } from '@upstash/qstash';
import { keys } from './keys';
const env = keys();

export const client = new Client({ token: env.QSTASH_TOKEN, baseUrl: env.QSTASH_URL });

export class UpstashEventBus implements EventBus {
  private listeners: { [listener: string]: string[] };
  constructor(listeners: { [listener: string]: string[] }) {
    this.listeners = listeners;
  }
  async publish<T>(events: Array<DomainEvent<T>>): Promise<void> {
    for (const event of events) {
      const { name, data } = event;
      const listeners = this.listeners[name];
      if (listeners) {
        for (const listener of listeners) {
          await client.publishJSON({
            url: `${env.NEXT_PUBLIC_BASE_URL}/handlers/${name}/${listener}`,
            body: {
              name,
              data,
            },
            retries: 3,
            retryInterval: 1000,
            timeout: 5000,
            contentBasedDeduplication: true,
          });
        }
      }
    }
  }
}
