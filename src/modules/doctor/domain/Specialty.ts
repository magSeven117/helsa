import { StringValueObject } from '@/modules/shared/domain/core/value-object';
import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';
import { Primitives } from '@/modules/shared/domain/types/Primitives';

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
