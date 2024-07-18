import { DateValueObject, StringValueObject } from "@/modules/shared/domain/core/ValueObject";
import { Primitives } from "@/modules/shared/domain/types/Primitives";
export class Education {
  constructor(
    public title: StringValueObject,
    public institution: StringValueObject,
    public degree: StringValueObject,
    public startDate: DateValueObject,
    public endDate: DateValueObject,
    public type: StringValueObject,
    public createdAt: DateValueObject,
    public updatedAt: DateValueObject
  ) {}

  static fromPrimitives(data: Primitives<Education>): Education {
    return new Education(
      new StringValueObject(data.title),
      new StringValueObject(data.institution),
      new StringValueObject(data.degree),
      new DateValueObject(data.startDate),
      new DateValueObject(data.endDate),
      new StringValueObject(data.type),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt)
    );
  }

  static create(
    title: string,
    institution: string,
    degree: string,
    startDate: string,
    endDate: string,
    type: string
  ): Education {
    return new Education(
      new StringValueObject(title),
      new StringValueObject(institution),
      new StringValueObject(degree),
      new DateValueObject(startDate),
      new DateValueObject(endDate),
      new StringValueObject(type),
      DateValueObject.today(),
      DateValueObject.today()
    );
  }

  toPrimitives(): Primitives<Education> {
    return {
      title: this.title.value,
      institution: this.institution.value,
      degree: this.degree.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      type: this.type.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  static initialize(): Education[] {
    return [];
  }
}
