import { NotFoundError } from '@helsa/ddd/core/errors/not-found-error';
import { AppointmentRepository } from '../domain/appointment-repository';

export class FinalizeAppointment {
  constructor(private readonly repository: AppointmentRepository) {}

  async run(id: string) {
    const appointment = await this.repository.get(id, { room: true });
    if (!appointment) {
      throw new NotFoundError(`Appointment ${id} not found`);
    }

    appointment.finalize();

    await this.repository.save(appointment);
  }
}
