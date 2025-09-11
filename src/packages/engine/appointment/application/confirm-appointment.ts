import { AppointmentRepository } from '../domain/appointment-repository';
import { AppointmentNotFoundError } from '../domain/errors/appointment-not-found-error';

export class ConfirmAppointment {
  constructor(private readonly repository: AppointmentRepository) {}

  async run(id: string) {
    const appointment = await this.repository.get(id);
    if (!appointment) {
      throw new AppointmentNotFoundError(id);
    }

    appointment.confirm();
    await this.repository.save(appointment);
  }
}
