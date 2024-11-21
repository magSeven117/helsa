import { Criteria, Operator } from '@/modules/shared/domain/core/criteria';
import { NotFoundError } from '@/modules/shared/domain/core/errors/not-found-error';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { Day } from '../../domain/day';
import { DoctorRepository } from '../../domain/doctor-repository';

export class CreateSchedule {
  constructor(private doctorRepository: DoctorRepository) {}

  async run(doctorId: string, days: Primitives<Day>[]) {
    const doctor = await this.doctorRepository.getByCriteria(
      Criteria.fromValues([{ field: 'id', value: doctorId, operator: Operator.EQUAL }])
    );
    if (!doctor) throw new NotFoundError('Doctor not found');

    doctor.createSchedule(days);

    await this.doctorRepository.save(doctor);
  }
}
