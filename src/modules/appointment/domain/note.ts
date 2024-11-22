import { DateValueObject, StringValueObject } from '@/modules/shared/domain/core/value-object';
import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';
import { Primitives } from '@/modules/shared/domain/types/primitives';

export class AppointmentNote {
  constructor(
    public id: Uuid,
    public date: DateValueObject,
    public description: StringValueObject,
    public appointmentId: Uuid
  ) {}

  toPrimitives() {
    return {
      id: this.id.toString(),
      date: this.date.value,
      description: this.description.value,
      appointmentId: this.appointmentId.toString(),
    };
  }

  static fromPrimitives(data: Primitives<AppointmentNote>): AppointmentNote {
    return new AppointmentNote(
      new Uuid(data.id),
      new DateValueObject(data.date),
      new StringValueObject(data.description),
      new Uuid(data.appointmentId)
    );
  }

  static create(date: Date, description: string, appointmentId: Uuid) {
    return new AppointmentNote(
      Uuid.random(),
      new DateValueObject(date),
      new StringValueObject(description),
      appointmentId
    );
  }
}
