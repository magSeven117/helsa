import { StringValueObject } from '@helsa/ddd/core/value-object';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Specialty } from '../../doctor/domain/specialty';

export class Symptom {
  constructor(public id: Uuid, public name: StringValueObject) {}

  static fromPrimitives(data: Primitives<Symptom>): Symptom {
    return new Specialty(new Uuid(data.id), new StringValueObject(data.name));
  }

  toPrimitives(): Primitives<Symptom> {
    return {
      id: this.id.value,
      name: this.name.value,
    };
  }
}
