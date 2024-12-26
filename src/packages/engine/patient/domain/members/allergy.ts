import { DateValueObject, StringValueObject } from '@helsa/ddd/core/value-object';
import { Enum } from '@helsa/ddd/core/value-objects/enum';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';

export class Allergy {
  constructor(
    public id: Uuid,
    public name: StringValueObject,
    public description: StringValueObject,
    public severity: AllergySeverity,
    public reaction: StringValueObject,
    public diagnosticDate: DateValueObject,
    public patientId: Uuid
  ) {}

  toPrimitives() {
    return {
      id: this.id.toString(),
      name: this.name.value,
      description: this.description.value,
      severity: this.severity.value,
      reaction: this.reaction.value,
      diagnosticDate: this.diagnosticDate.value,
      patientId: this.patientId.toString(),
    };
  }

  static fromPrimitives(primitives: Primitives<Allergy>): Allergy {
    return new Allergy(
      new Uuid(primitives.id),
      new StringValueObject(primitives.name),
      new StringValueObject(primitives.description),
      new AllergySeverity(primitives.severity),
      new StringValueObject(primitives.reaction),
      new DateValueObject(primitives.diagnosticDate),
      new Uuid(primitives.patientId)
    );
  }
}

export enum AllergySeverityTypes {
  MILD = 'MILD',
  MODERATE = 'MODERATE',
  SEVERE = 'SEVERE',
}

export class AllergySeverity extends Enum<AllergySeverityTypes> {
  constructor(value: AllergySeverityTypes) {
    super(value, Object.values(AllergySeverityTypes));
  }
}
