import { Enum } from '@helsa/ddd/core/value-objects/enum';

export enum DiagnosisTypeValues {
  ALLERGY = 'ALLERGY',
  DISEASE = 'DISEASE',
  CHRONIC_DISEASE = 'CHRONIC_DISEASE',
  SYMPTOM = 'SYMPTOM',
}

export class DiagnosisType extends Enum<DiagnosisTypeValues> {
  constructor(value: DiagnosisTypeValues) {
    super(value, Object.values(DiagnosisTypeValues));
  }
}
