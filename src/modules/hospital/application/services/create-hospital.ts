import { FormatError } from '@/modules/shared/domain/core/errors/format-error';
import { Hospital } from '../../domain/hospital';
import { HospitalCriteria } from '../../domain/hospital-criteria';
import { HospitalRepository } from '../../domain/hospital-repository';

export class CreateHospital {
  constructor(private hospitalRepository: HospitalRepository) {}

  async run(adminId: string) {
    const existing = await this.hospitalRepository.find(HospitalCriteria.findByAdminId(adminId));
    if (existing) {
      throw new FormatError('Hospital already exists');
    }
    const hospital = Hospital.create(adminId);

    return this.hospitalRepository.save(hospital);
  }
}
