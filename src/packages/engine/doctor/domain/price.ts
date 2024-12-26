import { NumberValueObject, StringValueObject } from '@helsa/ddd/core/value-object';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';
import { AppointmentType } from '../../appointment/domain/appointment-type';

export class Price {
  constructor(
    public id: Uuid,
    public name: StringValueObject,
    public amount: NumberValueObject,
    public currency: StringValueObject,
    public duration: NumberValueObject,
    public doctorId: Uuid,
    public typeId: Uuid,
    public type?: AppointmentType,
  ) {}

  static create(
    id: string,
    name: string,
    amount: number,
    currency: string,
    duration: number,
    doctorId: string,
    typeId: string,
  ): Price {
    return new Price(
      new Uuid(id),
      new StringValueObject(name),
      new NumberValueObject(amount),
      new StringValueObject(currency),
      new NumberValueObject(duration),
      new Uuid(doctorId),
      new Uuid(typeId),
    );
  }

  static fromPrimitives(data: any): Price {
    return new Price(
      new Uuid(data.id),
      new StringValueObject(data.name),
      new NumberValueObject(data.amount),
      new StringValueObject(data.currency),
      new NumberValueObject(data.duration),
      new Uuid(data.doctorId),
      new Uuid(data.typeId),
      data.type ? AppointmentType.fromPrimitives(data.type) : undefined,
    );
  }

  toPrimitives(): Primitives<Price> {
    return {
      id: this.id.value,
      name: this.name.value,
      amount: this.amount.value,
      currency: this.currency.value,
      duration: this.duration.value,
      doctorId: this.doctorId.value,
      typeId: this.typeId.value,
      type: this.type ? this.type.toPrimitives() : undefined,
    };
  }
}
