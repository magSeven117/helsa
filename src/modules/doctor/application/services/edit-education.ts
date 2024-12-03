import { Criteria, Operator } from '@/modules/shared/domain/core/criteria';
import { NotFoundError } from '@/modules/shared/domain/core/errors/not-found-error';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { DoctorRepository } from '../../domain/doctor-repository';
import { Education } from '../../domain/educations';

export class EditEducation {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async run(doctorId: string, educationId: string, education: Primitives<Education>) {
    const doctor = await this.doctorRepository.getByCriteria(
      Criteria.fromValues([{ field: 'id', value: doctorId, operator: Operator.EQUAL }])
    );

    if (!doctor) {
      throw new NotFoundError('Doctor not found');
    }

    doctor.saveEducation(education);

    await this.doctorRepository.saveEducations(doctor.id.value, doctor.educations ?? []);
  }
}
