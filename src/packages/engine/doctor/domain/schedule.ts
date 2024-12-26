import { NumberValueObject } from '@helsa/ddd/core/value-object';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Day } from './day';

export class Schedule {
  constructor(
    public id: Uuid,
    public appointmentDuration: NumberValueObject,
    public maxAppointmentsPerDay: NumberValueObject,
    public days: Day[]
  ) {}

  public static fromPrimitives(data: Primitives<Schedule>) {
    return new Schedule(
      new Uuid(data.id),
      new NumberValueObject(data.appointmentDuration),
      new NumberValueObject(data.maxAppointmentsPerDay),
      data.days.map(Day.fromPrimitives)
    );
  }

  public static create(appointmentDuration: number, maxAppointmentsPerDay: number, days: Primitives<Day>[]): Schedule {
    return new Schedule(
      Uuid.random(),
      new NumberValueObject(appointmentDuration),
      new NumberValueObject(maxAppointmentsPerDay),
      days.map((day) => Day.create(day.day, day.hours))
    );
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      appointmentDuration: this.appointmentDuration.value,
      maxAppointmentsPerDay: this.maxAppointmentsPerDay.value,
      days: this.days.map((day) => day.toPrimitives()),
    };
  }

  public static initialize(): Schedule {
    return Schedule.create(0, 0, [
      { day: 'monday', hours: [] },
      { day: 'tuesday', hours: [] },
      { day: 'wednesday', hours: [] },
      { day: 'thursday', hours: [] },
      { day: 'friday', hours: [] },
      { day: 'saturday', hours: [] },
      { day: 'sunday', hours: [] },
    ]);
  }

  public update(days: Primitives<Day>[]): Schedule {
    return new Schedule(
      this.id,
      this.appointmentDuration,
      this.maxAppointmentsPerDay,
      days.map((day) => Day.create(day.day, day.hours))
    );
  }
}
