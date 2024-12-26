import { DateValueObject, StringValueObject } from '@helsa/ddd/core/value-object';
import { Enum } from '@helsa/ddd/core/value-objects/enum';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';

export class ChronicDisease {
  constructor(
    public id: Uuid,
    public type: ChronicDiseaseType,
    public description: StringValueObject,
    public actualState: DiseaseState,
    public diagnosticDate: DateValueObject
  ) {}

  static fromPrimitives(data: Primitives<ChronicDisease>): ChronicDisease {
    return new ChronicDisease(
      new Uuid(data.id),
      new ChronicDiseaseType(data.type),
      new StringValueObject(data.description),
      new DiseaseState(data.actualState),
      new DateValueObject(data.diagnosticDate)
    );
  }

  toPrimitives(): Primitives<ChronicDisease> {
    return {
      id: this.id.toString(),
      type: this.type.value,
      description: this.description.value,
      actualState: this.actualState.value,
      diagnosticDate: this.diagnosticDate.value,
    };
  }
}

export enum DiseaseStates {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  CONTROLLED = 'CONTROLLED',
}
export class DiseaseState extends Enum<DiseaseStates> {
  constructor(value: DiseaseStates) {
    super(value, Object.values(DiseaseStates));
  }
}

export enum ChronicDiseaseTypes {
  GENETIC = 'GENETIC',
  AMBIENTAL = 'AMBIENTAL',
  HABITUAL = 'HABITUAL',
  INFECTIOUS = 'INFECTIOUS',
}
export class ChronicDiseaseType extends Enum<ChronicDiseaseTypes> {
  constructor(value: ChronicDiseaseTypes) {
    super(value, Object.values(ChronicDiseaseTypes));
  }
}
