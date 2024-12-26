import { Aggregate } from '@helsa/ddd/core/aggregate';
import { DateValueObject, NumberValueObject, StringValueObject } from '@helsa/ddd/core/value-object';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '../../appointment/domain/appointment';
import { User } from '../../user/domain/user';
import { ConsultingRoomAddress } from './consulting-room-address';
import { Day } from './day';
import { Education } from './educations';
import { ScheduleRegistered } from './events/schedule-registered';
import { Price } from './price';
import { Schedule } from './schedule';
import { Specialty } from './specialty';

export class Doctor extends Aggregate {
  constructor(
    id: Uuid,
    public userId: Uuid,
    public licenseMedicalNumber: StringValueObject,
    public specialtyId: Uuid,
    public score: NumberValueObject,
    public experience: NumberValueObject,
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
    public schedule?: Schedule,
    public consultingRoomAddress?: ConsultingRoomAddress,
    public educations?: Education[],
    public specialty?: Specialty,
    public appointments?: Appointment[],
    public prices?: Price[],
    public user?: User,
  ) {
    super(id, createdAt, updatedAt);
  }

  static create(id: string, userId: string, licenseMedicalNumber: string, specialtyId: string): Doctor {
    return new Doctor(
      new Uuid(id),
      new Uuid(userId),
      new StringValueObject(licenseMedicalNumber),
      new Uuid(specialtyId),
      new NumberValueObject(0),
      new NumberValueObject(1),
      DateValueObject.today(),
      DateValueObject.today(),
      Schedule.initialize(),
    );
  }

  static fromPrimitives(data: Primitives<Doctor>): Doctor {
    return new Doctor(
      new Uuid(data.id),
      new Uuid(data.userId),
      new StringValueObject(data.licenseMedicalNumber),
      new Uuid(data.specialtyId),
      new NumberValueObject(data.score),
      new NumberValueObject(data.experience),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt),
      data.schedule ? Schedule.fromPrimitives(data.schedule) : undefined,
      data.consultingRoomAddress ? ConsultingRoomAddress.fromPrimitives(data.consultingRoomAddress) : undefined,
      data.educations
        ? data.educations.map((education: Primitives<Education>) => Education.fromPrimitives(education))
        : [],
      data.specialty ? Specialty.fromPrimitives(data.specialty) : undefined,
      data.appointments ? data.appointments.map((appointment) => Appointment.fromPrimitives(appointment)) : [],
      data.prices ? data.prices.map((price) => Price.fromPrimitives(price)) : [],
      data.user ? User.fromPrimitives(data.user) : undefined,
    );
  }

  toPrimitives(): Primitives<Doctor> {
    return {
      id: this.id.value,
      userId: this.userId.value,
      licenseMedicalNumber: this.licenseMedicalNumber.value,
      specialtyId: this.specialtyId.value,
      score: this.score.value,
      experience: this.experience.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
      schedule: this.schedule ? this.schedule.toPrimitives() : undefined,
      consultingRoomAddress: this.consultingRoomAddress ? this.consultingRoomAddress.toPrimitives() : undefined,
      educations: this.educations ? this.educations.map((education) => education.toPrimitives()) : [],
      specialty: this.specialty ? this.specialty.toPrimitives() : undefined,
      appointments: this.appointments ? this.appointments.map((appointment) => appointment.toPrimitives()) : [],
      prices: this.prices ? this.prices.map((price) => price.toPrimitives()) : [],
      user: this.user ? this.user.toPrimitives() : undefined,
    };
  }

  update(data: Partial<Primitives<Doctor>>) {
    const before = this.toPrimitives();
    const after = { ...before, ...data };
    return Doctor.fromPrimitives(after);
  }

  createConsultingRoomAddress(city: string, address: string) {
    this.consultingRoomAddress = ConsultingRoomAddress.create(city, address, { latitude: 0, longitude: 0 });
  }

  saveEducation(education: Primitives<Education>) {
    if (!this.educations) {
      this.educations = [];
    }
    const index = this.educations.findIndex((edu) => edu.id.value === education.id);
    if (index >= 0) {
      this.educations[index] = Education.fromPrimitives(education);
    } else {
      this.educations.push(Education.create(education.title, education.institution, education.graduatedAt.toString()));
    }
  }

  createSchedule(days: Primitives<Day>[]) {
    this.schedule = this.schedule ? this.schedule.update(days) : Schedule.create(1, 24, days);
    this.record(new ScheduleRegistered(this.id.value, days));
  }

  savePrice(price: Primitives<Price>) {
    if (!this.prices) {
      this.prices = [];
    }
    const index = this.prices.findIndex((p) => p.id.value === price.id);
    if (index >= 0) {
      this.prices[index] = Price.fromPrimitives(price);
    } else {
      this.prices.push(
        Price.create(price.id, price.name, price.amount, price.currency, price.duration, this.id.value, price.typeId),
      );
    }
  }
}
