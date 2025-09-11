import { Specification } from '@helsa/ddd/core/specification';
import { Appointment } from '../appointment';
import { AppointmentStatusEnum } from '../status';

export class CanConfirm extends Specification<Appointment> {
  isSatisfiedBy(appointment: Appointment): boolean {
    return appointment.status.value === AppointmentStatusEnum.SCHEDULED;
  }

  static check(appointment: Appointment): boolean {
    return new CanConfirm().isSatisfiedBy(appointment);
  }
}
