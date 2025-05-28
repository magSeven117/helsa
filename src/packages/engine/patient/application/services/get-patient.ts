import { Criteria, Operator } from '@helsa/ddd/core/criteria';
import { NotFoundError } from '@helsa/ddd/core/errors/not-found-error';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Patient } from '../../domain/patient';
import { PatientRepository } from '../../domain/patient-repository';

export class GetPatient {
  constructor(private readonly patientRepository: PatientRepository) {}

  async run(id: string, field = 'id'): Promise<Primitives<Patient>> {
    const patient = await this.patientRepository.find(
      Criteria.fromValues([{ field, value: id, operator: Operator.EQUAL }]),
    );

    if (!patient) {
      throw new NotFoundError('Patient not found');
    }

    return patient.toPrimitives();
  }
}
