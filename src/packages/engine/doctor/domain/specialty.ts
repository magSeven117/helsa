import { StringValueObject } from '@helsa/ddd/core/value-object';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';

export class Specialty {
  constructor(public id: Uuid, public name: StringValueObject) {}

  static fromPrimitives(data: Primitives<Specialty>): Specialty {
    return new Specialty(new Uuid(data.id), new StringValueObject(data.name));
  }

  toPrimitives(): Primitives<Specialty> {
    return {
      id: this.id.value,
      name: this.name.value,
    };
  }
}
