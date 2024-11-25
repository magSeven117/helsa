import { Criteria, Operator } from '@/modules/shared/domain/core/criteria';
import { NotFoundError } from '@/modules/shared/domain/core/errors/not-found-error';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { PatientDemographic } from '../../domain/members/demographic';
import { PatientRepository } from '../../domain/patient-repository';

export class UpdateDemographic {
  constructor(private patientRepository: PatientRepository) {}

  async run(id: string, demographic: Primitives<PatientDemographic>) {
    const patient = await this.patientRepository.find(
      Criteria.fromValues([{ field: 'id', value: id, operator: Operator.EQUAL }])
    );

    if (!patient) {
      throw new NotFoundError('Patient not found');
    }

    patient.updateDemographic(demographic);
    return this.patientRepository.save(patient);
  }
}
