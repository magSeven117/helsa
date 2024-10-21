import { Aggregate } from '@/modules/shared/domain/core/Aggregate';
import { Uuid } from '@/modules/shared/domain/core/value-objects/Uuid';
import { DateValueObject, NumberValueObject, StringValueObject } from '@/modules/shared/domain/core/ValueObject';
import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { ConsultingRoomAddress } from './ConsultingRoomAddress';
import { Education } from './Educations';
import { Experience } from './Experience';
import { Schedule } from './Schedule';

export class Doctor extends Aggregate {
  constructor(
    id: Uuid,
    public userId: Uuid,
    public licenseMedicalNumber: StringValueObject,
    public specialtyId: Uuid,
    public score: NumberValueObject,
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
    public schedule?: Schedule,
    public consultingRoomAddress?: ConsultingRoomAddress,
    public educations?: Education[],
    public experiences?: Experience[]
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
      DateValueObject.today(),
      DateValueObject.today()
    );
  }

  static fromPrimitives(data: Primitives<Doctor>): Doctor {
    return new Doctor(
      new Uuid(data.id),
      new Uuid(data.userId),
      new StringValueObject(data.licenseMedicalNumber),
      new Uuid(data.specialtyId),
      new NumberValueObject(data.score),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt),
      data.schedule ? Schedule.fromPrimitives(data.schedule) : undefined,
      data.consultingRoomAddress ? ConsultingRoomAddress.fromPrimitives(data.consultingRoomAddress) : undefined,
      data.educations ? data.educations.map((education) => Education.fromPrimitives(education)) : undefined,
      data.experiences ? data.experiences.map((experience) => Experience.fromPrimitives(experience)) : undefined
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      userId: this.userId.value,
      licenseMedicalNumber: this.licenseMedicalNumber.value,
      specialtyId: this.specialtyId.value,
      score: this.score.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
      schedule: this.schedule ? this.schedule.toPrimitives() : undefined,
      consultingRoomAddress: this.consultingRoomAddress ? this.consultingRoomAddress.toPrimitives() : undefined,
      educations: this.educations ? this.educations.map((education) => education.toPrimitives()) : undefined,
      experiences: this.experiences ? this.experiences.map((experience) => experience.toPrimitives()) : undefined,
    };
  }
}
