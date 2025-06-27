import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '../domain/appointment';
import { AppointmentRepository } from '../domain/appointment-repository';
import { AppointmentNotFoundError } from '../domain/errors/appointment-not-found-error';

export class GetAppointment {
  constructor(private readonly repository: AppointmentRepository) {}

  async run(id: string, include?: any): Promise<Primitives<Appointment>> {
    const appointment = await this.repository.get(id, include);
    if (!appointment) {
      throw new AppointmentNotFoundError(id);
    }

    return appointment.toPrimitives();
  }
}
