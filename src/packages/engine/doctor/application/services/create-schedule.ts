import { Criteria, Operator } from '@helsa/ddd/core/criteria';
import { EventBus } from '@helsa/ddd/core/domain-event';
import { NotFoundError } from '@helsa/ddd/core/errors/not-found-error';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Day } from '../../domain/day';
import { DoctorRepository } from '../../domain/doctor-repository';

export class CreateSchedule {
  constructor(private doctorRepository: DoctorRepository, private bus: EventBus) {}

  async run(doctorId: string, days: Primitives<Day>[]) {
    const doctor = await this.doctorRepository.getByCriteria(
      Criteria.fromValues([{ field: 'id', value: doctorId, operator: Operator.EQUAL }])
    );
    if (!doctor) throw new NotFoundError('Doctor not found');

    doctor.createSchedule(days);
    await this.doctorRepository.saveSchedule(doctor.id.value, doctor.schedule);
    await this.bus.publish(doctor.pullDomainEvents());
  }
}
