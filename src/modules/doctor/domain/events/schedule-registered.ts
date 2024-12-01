import { DomainEvent, DomainEventPrimitives } from '@/modules/shared/domain/core/domain-event';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { Day } from '../day';

export type ScheduleRegisteredData = {
  doctorId: string;
  days: Primitives<Day>[];
};

export class ScheduleRegistered extends DomainEvent<ScheduleRegisteredData> {
  static EVENT_NAME: string = 'schedule-registered';

  constructor(doctorId: string, days: Primitives<Day>[]) {
    super({
      id: undefined,
      occurred_on: undefined,
      name: ScheduleRegistered.EVENT_NAME,
      data: { doctorId, days },
      aggregate: 'doctor',
    });
  }

  public toPrimitive(): DomainEventPrimitives<ScheduleRegisteredData> {
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
