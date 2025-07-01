import { Specification } from '@helsa/ddd/core/specification';
import { Appointment } from '../appointment';

export class CanFinalize extends Specification<Appointment> {
  isSatisfiedBy(appointment: Appointment): boolean {
    return (
      (appointment.room!.patientEnter.value && appointment.room!.doctorEnter.value) ||
      (!appointment.room!.patientEnter.value && !appointment.room!.doctorEnter.value)
    );
  }

  static check(appointment: Appointment): boolean {
    return new CanFinalize().isSatisfiedBy(appointment);
  }
}
