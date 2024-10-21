import { Uuid } from '@/modules/shared/domain/core/value-objects/Uuid';
import { DateValueObject, StringValueObject } from '@/modules/shared/domain/core/ValueObject';
import { Primitives } from '@/modules/shared/domain/types/Primitives';

export class Experience {
  constructor(
    public id: Uuid,
    public title: StringValueObject,
    public institution: StringValueObject,
    public description: StringValueObject,
    public startDate: DateValueObject,
    public endDate: DateValueObject,
    public type: StringValueObject,
    public createdAt: DateValueObject,
    public updatedAt: DateValueObject
  ) {}

  static fromPrimitives(data: Primitives<Experience>): Experience {
    return new Experience(
      new Uuid(data.id),
      new StringValueObject(data.title),
      new StringValueObject(data.institution),
      new StringValueObject(data.description),
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
    description: string,
    startDate: string,
    endDate: string,
    type: string
  ): Experience {
    return new Experience(
      Uuid.random(),
      new StringValueObject(title),
      new StringValueObject(institution),
      new StringValueObject(description),
      new DateValueObject(startDate),
      new DateValueObject(endDate),
      new StringValueObject(type),
      DateValueObject.today(),
      DateValueObject.today()
    );
  }
  toPrimitives(): Primitives<Experience> {
    return {
      id: this.id.value,
      title: this.title.value,
      institution: this.institution.value,
      description: this.description.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      type: this.type.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  static initialize(): Experience[] {
    return [];
  }
}
