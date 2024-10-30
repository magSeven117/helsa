import { FormatError } from '@/modules/shared/domain/core/errors/format-error';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { Hospital } from '../../domain/hospital';
import { HospitalCriteria } from '../../domain/hospital-criteria';
import { HospitalRepository } from '../../domain/hospital-repository';

export class CreateHospital {
  constructor(private hospitalRepository: HospitalRepository) {}

  async run(data: Partial<Primitives<Hospital>>): Promise<void> {
    const existing = await this.hospitalRepository.find(HospitalCriteria.findByAdminId(data.adminId));
    if (existing) {
      throw new FormatError('Hospital already exists');
    }
    const hospital = Hospital.create(data.adminId, data.name, data.address);

    return this.hospitalRepository.save(hospital);
  }
}
