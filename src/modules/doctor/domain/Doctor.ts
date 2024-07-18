import { Aggregate } from "@/modules/shared/domain/core/Aggregate";
import { Uuid } from "@/modules/shared/domain/core/value-objects/Uuid";
import { DateValueObject, NumberValueObject, StringValueObject } from "@/modules/shared/domain/core/ValueObject";
import { Primitives } from "@/modules/shared/domain/types/Primitives";
import { ConsultingRoomAddress } from "./ConsultingRoomAddress";
import { Education } from "./Educations";
import { Experience } from "./Experience";
import { Schedule } from "./Schedule";

export class Doctor extends Aggregate {
  constructor(
    id: Uuid,
    public userId: Uuid,
    public licenseMedicalNumber: StringValueObject,
    public specialtyId: Uuid,
    public score: NumberValueObject,
    public educations: Education[],
    public experiences: Experience[],
    public schedule: Schedule,
    public consultingRoomAddress: ConsultingRoomAddress,
    createdAt: DateValueObject,
    updatedAt: DateValueObject
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
      Education.initialize(),
      Experience.initialize(),
      Schedule.initialize(),
      ConsultingRoomAddress.initialize(),
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
      data.educations.map(Education.fromPrimitives),
      data.experiences.map(Experience.fromPrimitives),
      Schedule.fromPrimitives(data.schedule),
      ConsultingRoomAddress.fromPrimitives(data.consultingRoomAddress),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt)
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      userId: this.userId.value,
      licenseMedicalNumber: this.licenseMedicalNumber.value,
      specialtyId: this.specialtyId.value,
      score: this.score.value,
      educations: this.educations.map((education) => education.toPrimitives()),
      experiences: this.experiences.map((experience) => experience.toPrimitives()),
      schedule: this.schedule.toPrimitives(),
      consultingRoomAddress: this.consultingRoomAddress.toPrimitives(),
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }
}
