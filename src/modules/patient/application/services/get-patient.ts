import { Criteria, Operator } from '@/modules/shared/domain/core/criteria';
import { NotFoundError } from '@/modules/shared/domain/core/errors/not-found-error';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { Patient } from '../../domain/patient';
import { PatientRepository } from '../../domain/patient-repository';

export class GetPatient {
  constructor(private readonly patientRepository: PatientRepository) {}

  async run(id: string): Promise<Primitives<Patient>> {
    const patient = await this.patientRepository.find(
      Criteria.fromValues([{ field: 'userId', value: id, operator: Operator.EQUAL }])
    );

    if (!patient) {
      throw new NotFoundError('Patient not found');
    }

    return patient.toPrimitives();
  }
}
