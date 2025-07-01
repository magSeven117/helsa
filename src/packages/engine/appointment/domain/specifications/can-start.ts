import { Specification } from '@helsa/ddd/core/specification';
import { Appointment } from '../appointment';
import { AppointmentStatusEnum } from '../status';

export class CanStart extends Specification<Appointment> {
  isSatisfiedBy(appointment: Appointment): boolean {
    return (
      appointment.status.value === AppointmentStatusEnum.READY &&
      appointment.room?.patientEnter.value == true &&
      appointment.room?.doctorEnter.value == true
    );
  }

  static check(appointment: Appointment): boolean {
    return new CanStart().isSatisfiedBy(appointment);
  }
}
