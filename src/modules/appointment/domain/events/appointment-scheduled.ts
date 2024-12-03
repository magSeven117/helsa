import { DomainEvent, DomainEventPrimitives } from '@/modules/shared/domain/core/domain-event';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { Appointment } from '../appointment';

export type AppointmentScheduledData = {
  appointment: Primitives<Appointment>;
};

export class AppointmentScheduled extends DomainEvent<AppointmentScheduledData> {
  static EVENT_NAME: string = 'appointment-scheduled';
  constructor(appointment: Primitives<Appointment>) {
    super({
      id: undefined,
      occurred_on: undefined,
      name: AppointmentScheduled.EVENT_NAME,
      data: { appointment },
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
