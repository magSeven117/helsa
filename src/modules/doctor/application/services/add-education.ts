import { Education } from '@prisma/client';
import { DoctorRepository } from '../../domain/doctor-repository';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { Doctor } from '../../domain/doctor';
import { Criteria, Operator } from '@/modules/shared/domain/core/criteria';

export class AddEducation {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async run(doctorId: string, education: Partial<Primitives<Doctor>>): Promise<void> {
    const doctor = await this.doctorRepository.getByCriteria(
      Criteria.fromValues([{ field: 'id', value: doctorId, operator: Operator.EQUAL }])
    );

    doctor.addEducation(education);

    await this.doctorRepository.save(doctor);
  }
}
