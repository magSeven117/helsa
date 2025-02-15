import { Criteria, Operator } from '@helsa/ddd/core/criteria';
import { DiagnosisRepository } from '../domain/diagnosis-repository';

export class GetDiagnoses {
  constructor(private readonly repository: DiagnosisRepository) {}

  async run(appointmentId: string) {
    const diagnoses = await this.repository.search(
      Criteria.fromValues([{ field: 'appointmentId', value: appointmentId, operator: Operator.EQUAL }])
    );

    return diagnoses.map((diagnosis) => diagnosis.toPrimitives());
  }
}
