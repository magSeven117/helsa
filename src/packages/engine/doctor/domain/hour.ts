import { StringValueObject } from '@helsa/ddd/core/value-object';
import { Primitives } from '@helsa/ddd/types/primitives';

export class Hour {
  constructor(public hour: StringValueObject) {}

  public static fromPrimitives(data: Primitives<Hour>) {
    return new Hour(new StringValueObject(data.hour));
  }

  public static create(hour: string): Hour {
    return new Hour(new StringValueObject(hour));
  }

  public toPrimitives() {
    return {
      hour: this.hour.value,
    };
  }
}
