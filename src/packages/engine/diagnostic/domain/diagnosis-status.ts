import { Enum } from '@helsa/ddd/core/value-objects/enum';

export enum DiagnosisStatusValues {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class DiagnosisStatus extends Enum<DiagnosisStatusValues> {
  constructor(value: DiagnosisStatusValues) {
    super(value, Object.values(DiagnosisStatusValues));
  }

  static Active() {
    return new DiagnosisStatus(DiagnosisStatusValues.ACTIVE);
  }
}
