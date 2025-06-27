import { Criteria, Operator } from '@helsa/ddd/core/criteria';
import { EventBus } from '@helsa/ddd/core/domain-event';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Day } from '../../domain/day';
import { DoctorRepository } from '../../domain/doctor-repository';
import { DoctorNotFoundError } from '../../domain/errors/doctor-not-found-error';

export class CreateSchedule {
  constructor(
    private doctorRepository: DoctorRepository,
    private bus: EventBus,
  ) {}

  async run(doctorId: string, days: Primitives<Day>[], duration?: number, maxAppointment?: number) {
    const doctor = await this.doctorRepository.getByCriteria(
      Criteria.fromValues([{ field: 'id', value: doctorId, operator: Operator.EQUAL }]),
    );
    if (!doctor) throw new DoctorNotFoundError(doctorId);

    doctor.saveSchedule(days, duration, maxAppointment);
    await this.doctorRepository.saveSchedule(doctor.id.value, doctor.schedule);
    await this.bus.publish(doctor.pullDomainEvents());
  }
}
