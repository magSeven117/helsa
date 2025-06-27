import { AppointmentRepository } from '../domain/appointment-repository';
import { AppointmentNotFoundError } from '../domain/errors/appointment-not-found-error';

export class FinalizeAppointment {
  constructor(private readonly repository: AppointmentRepository) {}

  async run(id: string) {
    const appointment = await this.repository.get(id, { room: true });
    if (!appointment) {
      throw new AppointmentNotFoundError(id);
    }

    appointment.finalize();

    await this.repository.save(appointment);
  }
}
