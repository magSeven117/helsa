import { Criteria, Operator } from '@helsa/ddd/core/criteria';
import { Primitives } from '@helsa/ddd/types/primitives';
import { DoctorRepository } from '../../domain/doctor-repository';
import { Education } from '../../domain/educations';

export class SaveEducation {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async run(doctorId: string, education: Primitives<Education>): Promise<void> {
    const doctor = await this.doctorRepository.getByCriteria(
      Criteria.fromValues([{ field: 'id', value: doctorId, operator: Operator.EQUAL }])
    );

    doctor.saveEducation(education);

    await this.doctorRepository.saveEducations(doctor.id.value, doctor.educations ?? []);
  }
}
