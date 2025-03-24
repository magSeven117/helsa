import { NotFoundError } from '@helsa/ddd/core/errors/not-found-error';
import { AppointmentRepository } from '../domain/appointment-repository';

export class PayAppointment {
  constructor(private readonly repository: AppointmentRepository) {}

  async run(id: string) {
    const appointment = await this.repository.get(id);
    if (!appointment) {
      throw new NotFoundError(`Appointment ${id} not found`);
    }

    if (!appointment.isPayable()) {
      throw new Error(`Appointment ${id} is not payable`);
    }

    appointment.pay();
    await this.repository.save(appointment);
  }
}
