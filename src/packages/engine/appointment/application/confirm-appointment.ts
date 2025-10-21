import { EventBus } from '@helsa/ddd/core/domain-event';
import { Appointment } from '../domain/appointment';
import { AppointmentRepository } from '../domain/appointment-repository';
import { AppointmentNotFoundError } from '../domain/errors/appointment-not-found-error';

export class ConfirmAppointment {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private eventBus: EventBus,
  ) {}

  async run(appointmentId: string): Promise<void> {
    const appointment = await this.appointmentRepository.get(appointmentId);
    if (!appointment) {
      throw new AppointmentNotFoundError(appointmentId);
    }

    appointment.confirm();
    await this.appointmentRepository.save(appointment);
    await this.eventBus.publish(appointment.pullDomainEvents());
  }
}
