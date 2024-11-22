import { Uuid } from './value-objects/uuid';

export type DomainEventPrimitives = {
  id: string | undefined;
  occurred_on: Date | undefined;
  name: string;
  data: Record<string, unknown>;
};
export abstract class DomainEvent {
  static EVENT_NAME: string;
  static fromPrimitives: (params: any) => DomainEvent;
  readonly id: string;
  readonly occurred_on: Date;
  readonly name: string;
  readonly data: Record<string, unknown>;

  constructor(event: DomainEventPrimitives) {
    this.id = event.id || Uuid.random().value;
    this.occurred_on = event.occurred_on || new Date();
    this.name = event.name;
    this.data = event.data;
  }

  public abstract toPrimitive(): DomainEventPrimitives;
  public abstract isPublic(): boolean;
}
export interface EventBus {
  publish(events: Array<DomainEvent>): Promise<void>;
}
