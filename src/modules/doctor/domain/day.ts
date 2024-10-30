import { Hour } from '@/modules/doctor/domain/hour';
import { StringValueObject } from '@/modules/shared/domain/core/value-object';
import { Primitives } from '@/modules/shared/domain/types/primitives';

export class Day {
  constructor(public day: StringValueObject, public hours: Hour[]) {}

  public static fromPrimitives(data: Primitives<Day>) {
    return new Day(new StringValueObject(data.day), data.hours.map(Hour.fromPrimitives));
  }

  public static create(day: string, hours: Primitives<Hour>[]): Day {
    return new Day(
      new StringValueObject(day),
      hours.map((hour) => Hour.create(hour.hour))
    );
  }

  public toPrimitives() {
    return {
      day: this.day.value,
      hours: this.hours.map((hour) => hour.toPrimitives()),
    };
  }
}
