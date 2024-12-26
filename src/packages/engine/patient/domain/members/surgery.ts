import { DateValueObject, StringValueObject } from '@helsa/ddd/core/value-object';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';

export class Surgery {
  constructor(
    public id: Uuid,
    public date: DateValueObject,
    public type: StringValueObject,
    public details: StringValueObject,
    public surgeon: StringValueObject,
    public hospital: StringValueObject
  ) {}

  toPrimitives(): Primitives<Surgery> {
    return {
      id: this.id.toString(),
      date: this.date.value,
      type: this.type.value,
      details: this.details.value,
      surgeon: this.surgeon.value,
      hospital: this.hospital.value,
    };
  }

  static fromPrimitives(data: Primitives<Surgery>): Surgery {
    return new Surgery(
      new Uuid(data.id),
      new DateValueObject(data.date),
      new StringValueObject(data.type),
      new StringValueObject(data.details),
      new StringValueObject(data.surgeon),
      new StringValueObject(data.hospital)
    );
  }
}
