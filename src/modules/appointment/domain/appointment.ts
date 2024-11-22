import { Aggregate } from '@/modules/shared/domain/core/aggregate';
import { DateValueObject, StringValueObject } from '@/modules/shared/domain/core/value-object';
import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { AppointmentNote } from './note';
import { AppointmentRating } from './rating';
import { AppointmentRecipe } from './recipe';
import { AppointmentRoom } from './room';
import { AppointmentStatus } from './status';
import { AppointmentTelemetry } from './telemetry';

export class Appointment extends Aggregate {
  constructor(
    id: Uuid,
    public type: StringValueObject,
    public initDate: DateValueObject,
    public endDate: DateValueObject,
    public status: AppointmentStatus,
    public patientId: Uuid,
    public doctorId: Uuid,
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
    public room?: AppointmentRoom,
    public rating?: AppointmentRating,
    public telemetry?: AppointmentTelemetry,
    public recipe?: AppointmentRecipe,
    public notes?: AppointmentNote[]
  ) {
    super(id, createdAt, updatedAt);
  }

  toPrimitives(): Primitives<Appointment> {
    return {
      id: this.id.toString(),
      type: this.type.value,
      initDate: this.initDate.value,
      endDate: this.endDate.value,
      status: this.status.getValue(),
      patientId: this.patientId.toString(),
      doctorId: this.doctorId.toString(),
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
      room: this.room ? this.room.toPrimitives() : undefined,
      rating: this.rating ? this.rating.toPrimitives() : undefined,
      telemetry: this.telemetry ? this.telemetry.toPrimitives() : undefined,
      recipe: this.recipe ? this.recipe.toPrimitives() : undefined,
      notes: this.notes.map((note) => note.toPrimitives()),
    };
  }

  static fromPrimitives(data: Primitives<Appointment>): Appointment {
    return new Appointment(
      new Uuid(data.id),
      new StringValueObject(data.type),
      new DateValueObject(data.initDate),
      new DateValueObject(data.endDate),
      new AppointmentStatus(data.status),
      new Uuid(data.patientId),
      new Uuid(data.doctorId),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt)
    );
  }

  static create(type: string, initDate: Date, endDate: Date, patientId: Uuid, doctorId: Uuid): Appointment {
    return new Appointment(
      Uuid.random(),
      new StringValueObject(type),
      new DateValueObject(initDate),
      new DateValueObject(endDate),
      AppointmentStatus.scheduled(),
      patientId,
      doctorId,
      DateValueObject.today(),
      DateValueObject.today()
    );
  }
}
