import { DomainEvent } from '@/modules/shared/domain/core/domain-event';
import { tasks } from '@trigger.dev/sdk/v3';
import { handlers } from './events.config';

export class TriggerEventBus {
  async publish<T>(events: DomainEvent<T>[]): Promise<void> {
    const jobs = events.map((event) => this.trigger(event));
    const allJobs = jobs.flat();
    await Promise.all(allJobs);
  }

  private trigger<T>(event: DomainEvent<T>) {
    const jobHandlers = handlers.filter((handler) => handler.events.includes(event.name));
    const jobs = jobHandlers.map((jobHandler) => tasks.trigger(jobHandler.taskId, event.toPrimitive()));
    return jobs;
  }
}
