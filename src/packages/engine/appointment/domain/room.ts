import { BooleanValueObject } from '@helsa/ddd/core/value-object';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';

export class AppointmentRoom {
  constructor(
    public id: Uuid,
    public patientEnter: BooleanValueObject,
    public doctorEnter: BooleanValueObject,
    public appointmentId: Uuid,
  ) {}

  public static create(id: Uuid, appointmentId: Uuid): AppointmentRoom {
    return new AppointmentRoom(id, BooleanValueObject.false(), BooleanValueObject.false(), appointmentId);
  }

  public static fromPrimitives(data: Primitives<AppointmentRoom>): AppointmentRoom {
    return new AppointmentRoom(
      new Uuid(data.id),
      new BooleanValueObject(data.patientEnter),
      new BooleanValueObject(data.doctorEnter),
      new Uuid(data.appointmentId),
    );
  }

  public toPrimitives(): Primitives<AppointmentRoom> {
    return {
      id: this.id.toString(),
      patientEnter: this.patientEnter.value,
      doctorEnter: this.doctorEnter.value,
      appointmentId: this.appointmentId.toString(),
    };
  }
}
