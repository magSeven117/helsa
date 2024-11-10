import { Criteria, Operator } from '@/modules/shared/domain/core/criteria';
import { NotFoundError } from '@/modules/shared/domain/core/errors/not-found-error';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { Hospital } from '../../domain/hospital';
import { HospitalRepository } from '../../domain/hospital-repository';

export class UpdateHospital {
  constructor(private hospitalRepository: HospitalRepository) {}

  async run(hospitalId: string, hospitalData: Partial<Primitives<Hospital>>): Promise<void> {
    const hospital = await this.hospitalRepository.find(
      Criteria.fromValues([{ field: 'id', value: hospitalId, operator: Operator.EQUAL }])
    );

    if (!hospital) {
      throw new NotFoundError('Hospital not found');
    }

    hospital.update(hospitalData);

    await this.hospitalRepository.save(hospital);
  }
}
