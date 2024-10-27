import { StringValueObject } from '@/modules/shared/domain/core/value-object';
import { Primitives } from '@/modules/shared/domain/types/primitives';

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
