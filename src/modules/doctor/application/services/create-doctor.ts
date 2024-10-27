import { Uuid } from '@/modules/shared/domain/core/value-objects/Uuid';
import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { Doctor } from '../../domain/Doctor';
import { DoctorRepository } from '../../domain/DoctorRepository';

export class CreateDoctor {
  constructor(private repository: DoctorRepository) {}
  async run(data: Partial<Primitives<Doctor>>): Promise<void> {
    const doctor = Doctor.create(Uuid.random().value, data.userId, data.licenseMedicalNumber, data.specialtyId);
    await this.repository.save(doctor);
  }
}
