import { Criteria, Filter } from '@helsa/ddd/core/criteria';
import { DiagnosisRepository } from '../domain/diagnosis-repository';

export class GetDiagnoses {
  constructor(private readonly repository: DiagnosisRepository) {}

  async run(criteria: Filter[]) {
    const diagnoses = await this.repository.search(Criteria.fromValues(criteria));

    return diagnoses.map((diagnosis) => diagnosis.toPrimitives());
  }
}
