import { BooleanValueObject, OptionalString, StringValueObject } from '@/modules/shared/domain/core/value-object';
import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';
import { Primitives } from '@/modules/shared/domain/types/primitives';

export class AppointmentType {
  constructor(
    public id: Uuid,
    public name: StringValueObject,
    public doctorId: OptionalString,
    public duration: StringValueObject,
    public color: StringValueObject,
    public system: BooleanValueObject
  ) {}

  public static create(
    name: string,
    doctorId: string,
    duration: string,
    color: string,
    system: boolean
  ): AppointmentType {
    return new AppointmentType(
      Uuid.random(),
      new StringValueObject(name),
      new OptionalString(doctorId),
      new StringValueObject(duration),
      new StringValueObject(color),
      new BooleanValueObject(system)
    );
  }

  public static fromPrimitives(data: Primitives<AppointmentType>): AppointmentType {
    return new AppointmentType(
      new Uuid(data.id),
      new StringValueObject(data.name),
      new OptionalString(data.doctorId),
      new StringValueObject(data.duration),
      new StringValueObject(data.color),
      new BooleanValueObject(data.system)
    );
  }

  public toPrimitives(): Primitives<AppointmentType> {
    return {
      id: this.id.toString(),
      name: this.name.getValue(),
      doctorId: this.doctorId.getValue(),
      duration: this.duration.getValue().toString(),
      color: this.color.getValue(),
      system: this.system.getValue(),
    };
  }
}
