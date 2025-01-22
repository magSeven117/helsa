import { Criteria, Operator } from '@helsa/ddd/core/criteria';

export class DiagnosticCriteria {
  static sameDiagnostic(patientId: string, pathologyId: string) {
    return Criteria.fromValues([
      { field: 'pathologyId', operator: Operator.EQUAL, value: pathologyId },
      { field: 'patientId', operator: Operator.EQUAL, value: patientId },
    ]);
  }
}
