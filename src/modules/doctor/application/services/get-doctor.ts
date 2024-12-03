import { Criteria, Operator } from '@/modules/shared/domain/core/criteria';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { Doctor } from '../../domain/doctor';
import { DoctorRepository } from '../../domain/doctor-repository';

export class GetDoctor {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async run(userId: string): Promise<Primitives<Doctor> | null> {
    const doctor = await this.doctorRepository.getByCriteria(
      Criteria.fromValues([{ field: 'userId', value: userId, operator: Operator.EQUAL }], undefined, undefined, [
        { field: 'consultingRoomAddress' },
        { field: 'appointmentTypes' },
        { field: 'educations' },
        { field: 'schedule' },
      ])
    );

    if (!doctor) {
      return null;
    }

    return doctor.toPrimitives();
  }
}
