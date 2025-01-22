import { StringValueObject } from '@helsa/ddd/core/value-object';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';

export class Pathology {
  constructor(public id: Uuid, public name: StringValueObject) {}
  static fromPrimitives(data: Primitives<Pathology>): Pathology {
    return new Pathology(new Uuid(data.id), new StringValueObject(data.name));
  }

  toPrimitives(): Primitives<Pathology> {
    return {
      id: this.id.value,
      name: this.name.value,
    };
  }
}
