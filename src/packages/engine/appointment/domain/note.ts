import { BooleanValueObject, DateValueObject, StringValueObject } from '@helsa/ddd/core/value-object';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';

export class AppointmentNote {
  constructor(
    public id: Uuid,
    public date: DateValueObject,
    public description: StringValueObject,
    public isPublic: BooleanValueObject,
    public appointmentId: Uuid,
  ) {}

  toPrimitives() {
    return {
      id: this.id.toString(),
      date: this.date.value,
      description: this.description.value,
      isPublic: this.isPublic.value,
      appointmentId: this.appointmentId.toString(),
    };
  }

  static fromPrimitives(data: Primitives<AppointmentNote>): AppointmentNote {
    return new AppointmentNote(
      new Uuid(data.id),
      new DateValueObject(data.date),
      new StringValueObject(data.description),
      new BooleanValueObject(data.isPublic),
      new Uuid(data.appointmentId),
    );
  }

  static create(id: string, date: Date, description: string, isPublic: boolean, appointmentId: Uuid) {
    return new AppointmentNote(
      new Uuid(id),
      new DateValueObject(date),
      new StringValueObject(description),
      new BooleanValueObject(isPublic),
      appointmentId,
    );
  }
}
