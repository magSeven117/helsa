import { NumberValueObject } from "@/modules/shared/domain/core/ValueObject";
import { Primitives } from "@/modules/shared/domain/types/Primitives";
import { Day } from "./Day";

export class Schedule {
  constructor(
    public appointmentDuration: NumberValueObject,
    public maxAppointmentsPerDay: NumberValueObject,
    public days: Day[]
  ) {}

  public static fromPrimitives(data: Primitives<Schedule>) {
    return new Schedule(
      new NumberValueObject(data.appointmentDuration),
      new NumberValueObject(data.maxAppointmentsPerDay),
      data.days.map(Day.fromPrimitives)
    );
  }

  public static create(appointmentDuration: number, maxAppointmentsPerDay: number, days: Primitives<Day>[]): Schedule {
    return new Schedule(
      new NumberValueObject(appointmentDuration),
      new NumberValueObject(maxAppointmentsPerDay),
      days.map((day) => Day.create(day.day, day.hours))
    );
  }

  public toPrimitives() {
    return {
      appointmentDuration: this.appointmentDuration.value,
      maxAppointmentsPerDay: this.maxAppointmentsPerDay.value,
      days: this.days.map((day) => day.toPrimitives()),
    };
  }

  public static initialize(): Schedule {
    return Schedule.create(0, 0, []);
  }
}
