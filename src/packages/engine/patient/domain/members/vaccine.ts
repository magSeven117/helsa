import { DateValueObject, NumberValueObject, StringValueObject } from '@helsa/ddd/core/value-object';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';

export class Vaccine {
  constructor(
    public id: Uuid,
    public name: StringValueObject,
    public dose: NumberValueObject,
    public date: DateValueObject,
    public notes: StringValueObject,
    public nextDose: DateValueObject
  ) {}

  toPrimitives(): Primitives<Vaccine> {
    return {
      id: this.id.toString(),
      name: this.name.value,
      dose: this.dose.value,
      date: this.date.value,
      notes: this.notes.value,
      nextDose: this.nextDose.value,
    };
  }

  static fromPrimitives(data: Primitives<Vaccine>): Vaccine {
    return new Vaccine(
      new Uuid(data.id),
      new StringValueObject(data.name),
      new NumberValueObject(data.dose),
      new DateValueObject(data.date),
      new StringValueObject(data.notes),
      new DateValueObject(data.nextDose)
    );
  }
}
