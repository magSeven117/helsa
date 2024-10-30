import { Primitives } from '@/modules/shared/domain/types/primitives';
import { Doctor } from '../../domain/doctor';
import { DoctorRepository } from '../../domain/doctor-repository';

export class CreateDoctor {
  constructor(private repository: DoctorRepository) {}
  async run(data: Partial<Primitives<Doctor>>): Promise<void> {
    const doctor = Doctor.create(data.id, data.userId, data.licenseMedicalNumber, data.specialtyId);
    await this.repository.save(doctor);
  }
}
