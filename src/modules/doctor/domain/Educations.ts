import { DateValueObject, StringValueObject } from '@/modules/shared/domain/core/value-object';
import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';
import { Primitives } from '@/modules/shared/domain/types/primitives';
export class Education {
  constructor(
    public id: Uuid,
    public title: StringValueObject,
    public institution: StringValueObject,
    public graduateAt: DateValueObject
  ) {}

  static fromPrimitives(data: Primitives<Education>): Education {
    return new Education(
      new Uuid(data.id),
      new StringValueObject(data.title),
      new StringValueObject(data.institution),
      new DateValueObject(data.graduateAt)
    );
  }

  static create(title: string, institution: string, graduateAt: string): Education {
    return new Education(
      Uuid.random(),
      new StringValueObject(title),
      new StringValueObject(institution),
      new DateValueObject(graduateAt)
    );
  }

  toPrimitives(): Primitives<Education> {
    return {
      id: this.id.value,
      title: this.title.value,
      institution: this.institution.value,
      graduateAt: this.graduateAt.value,
    };
  }

  static initialize(): Education[] {
    return [];
  }
}
