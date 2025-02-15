import { Criteria, Filter } from '@helsa/ddd/core/criteria';
import { TreatmentRepository } from '../domain/treatment-repository';

export class GetTreatments {
  constructor(private readonly repository: TreatmentRepository) {}

  async run(criteria: Filter[]) {
    const treatments = await this.repository.search(Criteria.fromValues(criteria));

    return treatments.map((treatment) => treatment.toPrimitives());
  }
}
