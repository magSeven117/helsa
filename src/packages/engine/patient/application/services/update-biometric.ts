import { Criteria, Operator } from '@helsa/ddd/core/criteria';
import { NotFoundError } from '@helsa/ddd/core/errors/not-found-error';
import { Primitives } from '@helsa/ddd/types/primitives';
import { PatientBiometric } from '../../domain/members/biometric';
import { PatientRepository } from '../../domain/patient-repository';

export class UpdateBiometric {
  constructor(private readonly repository: PatientRepository) {}

  async run(patientId: string, data: Primitives<PatientBiometric>) {
    const patient = await this.repository.find(
      Criteria.fromValues([{ field: 'id', value: patientId, operator: Operator.EQUAL }])
    );
    if (!patient) {
      throw new NotFoundError('Patient not found');
    }

    patient.updateBiometric(data);

    await this.repository.save(patient);
  }
}
