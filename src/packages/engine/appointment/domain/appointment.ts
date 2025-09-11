import { Aggregate } from '@helsa/ddd/core/aggregate';
import { DateValueObject, StringValueObject } from '@helsa/ddd/core/value-object';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';
import { format } from 'date-fns';
import { Diagnostic } from '../../diagnostic/domain/diagnostic';
import { Doctor } from '../../doctor/domain/doctor';
import { Price } from '../../doctor/domain/price';
import { Specialty } from '../../doctor/domain/specialty';
import { Document } from '../../document/domain/document';
import { Order } from '../../order/domain/order';
import { Patient } from '../../patient/domain/patient';
import { Treatment } from '../../treatment/domain/treatment';
import { AppointmentType } from './appointment-type';
import { AppointmentScheduled } from './events/appointment-scheduled';
import { UserEnteredAppointment } from './events/user-enter';
import { AppointmentNote } from './note';
import { AppointmentRating } from './rating';
import { AppointmentRecipe } from './recipe';
import { AppointmentRoom } from './room';
import { CanFinalize } from './specifications/can-finalize';
import { CanStart } from './specifications/can-start';
import { AppointmentStatus, AppointmentStatusEnum } from './status';
import { Symptom } from './symptom';
import { AppointmentTelemetry } from './telemetry';

export type AppointmentPrimitives = Primitives<Appointment>;

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
    public specialtyId: Uuid,
    public priceId: Uuid,
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
    public room?: AppointmentRoom,
    public rating?: AppointmentRating,
    public telemetry?: AppointmentTelemetry,
    public recipe?: AppointmentRecipe,
    public notes?: AppointmentNote[],
    public doctor?: Doctor,
    public type?: AppointmentType,
    public patient?: Patient,
    public price?: Price,
    public symptoms?: Symptom[],
    public diagnostics?: Diagnostic[],
    public documents?: Document[],
    public treatments?: Treatment[],
    public specialty?: Specialty,
    public orders?: Order[],
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
      specialtyId: this.specialtyId.value,
      priceId: this.priceId.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
      room: this.room ? this.room.toPrimitives() : undefined,
      rating: this.rating ? this.rating.toPrimitives() : undefined,
      telemetry: this.telemetry ? this.telemetry.toPrimitives() : undefined,
      recipe: this.recipe ? this.recipe.toPrimitives() : undefined,
      notes: this.notes ? this.notes.map((note) => note.toPrimitives()) : undefined,
      doctor: this.doctor ? this.doctor.toPrimitives() : undefined,
      type: this.type ? this.type.toPrimitives() : undefined,
      patient: this.patient ? this.patient.toPrimitives() : undefined,
      price: this.price ? this.price.toPrimitives() : undefined,
      symptoms: this.symptoms ? this.symptoms.map((symptom) => symptom.toPrimitives()) : undefined,
      diagnostics: this.diagnostics ? this.diagnostics.map((diagnosis) => diagnosis.toPrimitives()) : undefined,
      documents: this.documents ? this.documents.map((document) => document.toPrimitives()) : undefined,
      treatments: this.treatments ? this.treatments.map((treatment) => treatment.toPrimitives()) : undefined,
      specialty: this.specialty ? this.specialty.toPrimitives() : undefined,
      orders: this.orders ? this.orders.map((order) => order.toPrimitives()) : undefined,
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
      new Uuid(data.specialtyId),
      new Uuid(data.priceId),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt),
      data.room ? AppointmentRoom.fromPrimitives(data.room) : undefined,
      data.rating ? AppointmentRating.fromPrimitives(data.rating) : undefined,
      data.telemetry ? AppointmentTelemetry.fromPrimitives(data.telemetry) : undefined,
      data.recipe ? AppointmentRecipe.fromPrimitives(data.recipe) : undefined,
      data.notes ? data.notes.map((note) => AppointmentNote.fromPrimitives(note)) : undefined,
      data.doctor ? Doctor.fromPrimitives(data.doctor) : undefined,
      data.type ? AppointmentType.fromPrimitives(data.type) : undefined,
      data.patient ? Patient.fromPrimitives(data.patient) : undefined,
      data.price ? Price.fromPrimitives(data.price) : undefined,
      data.symptoms ? data.symptoms.map((symptom) => Symptom.fromPrimitives(symptom)) : undefined,
      data.diagnostics ? data.diagnostics.map((diagnosis) => Diagnostic.fromPrimitives(diagnosis)) : undefined,
      data.documents ? data.documents.map((document) => Document.fromPrimitives(document)) : undefined,
      data.treatments ? data.treatments.map((treatment) => Treatment.fromPrimitives(treatment)) : undefined,
      data.specialty ? Specialty.fromPrimitives(data.specialty) : undefined,
      data.orders ? data.orders.map((order) => Order.fromPrimitives(order)) : undefined,
    );
  }

  static create(
    id: string,
    date: Date,
    motive: string,
    patientId: string,
    doctorId: string,
    typeId: string,
    specialtyId: string,
    priceId: string,
  ): Appointment {
    const appointment = new Appointment(
      new Uuid(id),
      new DateValueObject(date),
      new StringValueObject(format(date, 'yyyy-MM-dd')),
      new StringValueObject(format(date, 'HH:mm')),
      AppointmentStatus.scheduled(),
      new StringValueObject(motive),
      new Uuid(patientId),
      new Uuid(doctorId),
      new Uuid(typeId),
      new Uuid(specialtyId),
      new Uuid(priceId),
      DateValueObject.today(),
      DateValueObject.today(),
    );
    appointment.record(new AppointmentScheduled(appointment.toPrimitives()));
    return appointment;
  }

  saveTelemetry(telemetry: Primitives<AppointmentTelemetry>): void {
    this.telemetry = AppointmentTelemetry.fromPrimitives({
      appointmentId: this.id.toString(),
      id: this.telemetry?.id.toString() ?? Uuid.random().toString(),
      bloodPressure: telemetry.bloodPressure ? telemetry.bloodPressure : (this.telemetry?.bloodPressure.value ?? 120),
      heartRate: telemetry.heartRate ? telemetry.heartRate : (this.telemetry?.heartRate.value ?? 72),
      temperature: telemetry.temperature ? telemetry.temperature : (this.telemetry?.temperature.value ?? 36.6),
      weight: telemetry.weight ? telemetry.weight : (this.telemetry?.weight.value ?? 70),
      oxygenSaturation: telemetry.oxygenSaturation
        ? telemetry.oxygenSaturation
        : (this.telemetry?.oxygenSaturation.value ?? 98),
      respiratoryRate: telemetry.respiratoryRate
        ? telemetry.respiratoryRate
        : (this.telemetry?.respiratoryRate.value ?? 16),
    });
  }

  isPayable(): boolean {
    return (
      this.status.value === AppointmentStatusEnum.SCHEDULED || this.status.value === AppointmentStatusEnum.CONFIRMED
    );
  }

  pay(): void {
    this.status = AppointmentStatus.payed();
  }

  confirm(): void {
    if (this.status.value === AppointmentStatusEnum.SCHEDULED) {
      this.status = AppointmentStatus.confirmed();
    }
  }

  markAsReady(): void {
    this.status = AppointmentStatus.ready();
  }

  createRoom() {
    this.room = AppointmentRoom.create(Uuid.random(), this.id);
  }

  start(): void {
    if (CanStart.check(this)) {
      this.status = AppointmentStatus.started();
    }
  }

  finalize() {
    if (CanFinalize.check(this)) {
      this.status = AppointmentStatus.finished();
    } else {
      if (this.room?.patientEnter.value == false) {
        this.status = AppointmentStatus.missedByPatient();
      } else if (this.room?.doctorEnter.value == false) {
        this.status = AppointmentStatus.missedByDoctor();
      }
    }
  }

  enterRoom(role: 'PATIENT' | 'DOCTOR') {
    if (role === 'PATIENT') {
      this.room?.enterPatient();
    } else {
      this.room?.enterDoctor();
    }
    this.record(
      new UserEnteredAppointment({
        appointmentId: this.id.toString(),
        role,
      }),
    );
  }
}
