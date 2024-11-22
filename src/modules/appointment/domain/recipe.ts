import { DateValueObject, StringValueObject } from '@/modules/shared/domain/core/value-object';
import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { MedicalReference } from './reference';

export class AppointmentRecipe {
  constructor(
    public id: Uuid,
    public date: DateValueObject,
    public description: StringValueObject,
    public appointmentId: Uuid,
    public references: MedicalReference[]
  ) {}

  toPrimitives() {
    return {
      id: this.id.toString(),
      date: this.date.value,
      description: this.description.value,
      appointmentId: this.appointmentId.toString(),
      references: this.references.map((reference) => reference.toPrimitives()),
    };
  }

  static fromPrimitives(data: Primitives<AppointmentRecipe>): AppointmentRecipe {
    return new AppointmentRecipe(
      new Uuid(data.id),
      new DateValueObject(data.date),
      new StringValueObject(data.description),
      new Uuid(data.appointmentId),
      data.references.map((reference: any) => MedicalReference.fromPrimitives(reference))
    );
  }

  static create(date: DateValueObject, description: StringValueObject, appointmentId: Uuid) {
    return new AppointmentRecipe(Uuid.random(), date, description, appointmentId, []);
  }
}
