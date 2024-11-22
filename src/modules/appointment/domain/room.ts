import { StringValueObject } from '@/modules/shared/domain/core/value-object';
import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';

export class AppointmentRoom {
  constructor(
    public id: Uuid,
    public token: StringValueObject,
    public url: StringValueObject,
    public appointmentId: Uuid
  ) {}

  public static create(
    id: Uuid,
    token: StringValueObject,
    url: StringValueObject,
    appointmentId: Uuid
  ): AppointmentRoom {
    return new AppointmentRoom(id, token, url, appointmentId);
  }

  public static fromPrimitives(data: any): AppointmentRoom {
    return new AppointmentRoom(
      new Uuid(data.id),
      new StringValueObject(data.token),
      new StringValueObject(data.url),
      new Uuid(data.appointmentId)
    );
  }

  public toPrimitives(): any {
    return {
      id: this.id.toString(),
      token: this.token.value,
      url: this.url.value,
      appointmentId: this.appointmentId.toString(),
    };
  }
}
