import { Aggregate } from '@/modules/shared/domain/core/aggregate';
import { DateValueObject, StringValueObject } from '@/modules/shared/domain/core/value-object';
import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { format } from 'date-fns';
import { AppointmentScheduled } from './events/appointment-scheduled';
import { AppointmentNote } from './note';
import { AppointmentRating } from './rating';
import { AppointmentRecipe } from './recipe';
import { AppointmentRoom } from './room';
import { AppointmentStatus } from './status';
import { AppointmentTelemetry } from './telemetry';

export class Appointment extends Aggregate {
  constructor(
    id: Uuid,
    public date: DateValueObject,
    public day: StringValueObject,
    public hour: StringValueObject,
    public status: AppointmentStatus,
    public motive: StringValueObject,
    public patientId: Uuid,
    public doctorId: Uuid,
    public typeId: Uuid,
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
      date: this.date.value,
      day: this.day.value,
      hour: this.hour.value,
      motive: this.motive.value,
      status: this.status.getValue(),
      patientId: this.patientId.toString(),
      doctorId: this.doctorId.toString(),
      typeId: this.typeId.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
      room: this.room ? this.room.toPrimitives() : undefined,
      rating: this.rating ? this.rating.toPrimitives() : undefined,
      telemetry: this.telemetry ? this.telemetry.toPrimitives() : undefined,
      recipe: this.recipe ? this.recipe.toPrimitives() : undefined,
      notes: this.notes ? this.notes.map((note) => note.toPrimitives()) : undefined,
    };
  }

  static fromPrimitives(data: Primitives<Appointment>): Appointment {
    return new Appointment(
      new Uuid(data.id),
      new DateValueObject(data.date),
      new StringValueObject(data.day),
      new StringValueObject(data.hour),
      new AppointmentStatus(data.status),
      new StringValueObject(data.motive),
      new Uuid(data.patientId),
      new Uuid(data.doctorId),
      new Uuid(data.typeId),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt)
    );
  }

  static create(date: Date, motive: string, patientId: string, doctorId: string, typeId: string): Appointment {
    const appointment = new Appointment(
      Uuid.random(),
      new DateValueObject(date),
      new StringValueObject(format(date, 'yyyy-MM-dd')),
      new StringValueObject(format(date, 'HH:mm')),
      AppointmentStatus.scheduled(),
      new StringValueObject(motive),
      new Uuid(patientId),
      new Uuid(doctorId),
      new Uuid(typeId),
      DateValueObject.today(),
      DateValueObject.today()
    );
    appointment.record(new AppointmentScheduled(appointment.toPrimitives()));
    return appointment;
  }
}
