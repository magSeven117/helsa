import { DomainEvent, DomainEventPrimitives } from '@helsa/ddd/core/domain-event';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '../appointment';

export type AppointmentScheduledData = Primitives<Appointment>;

export class AppointmentScheduled extends DomainEvent<AppointmentScheduledData> {
  static EVENT_NAME: string = 'appointment/scheduled';
  constructor(appointment: Primitives<Appointment>) {
    super({
      id: undefined,
      occurred_on: undefined,
      name: AppointmentScheduled.EVENT_NAME,
      data: { ...appointment },
      aggregate: 'appointment',
    });
  }

  public toPrimitive(): DomainEventPrimitives<AppointmentScheduledData> {
    return {
      id: this.id,
      occurred_on: this.occurred_on,
      name: this.name,
      data: this.data,
      aggregate: this.aggregate,
    };
  }
  public isPublic(): boolean {
    return true;
  }
}
