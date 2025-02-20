import { NotFoundError } from '@helsa/ddd/core/errors/not-found-error';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '../domain/appointment';
import { AppointmentRepository } from '../domain/appointment-repository';

export class GetAppointment {
  constructor(private readonly repository: AppointmentRepository) {}

  async run(id: string, include?: any): Promise<Primitives<Appointment> | void> {
    try {
      const appointment = await this.repository.get(id, include);
      if (!appointment) {
        throw new NotFoundError('Appointment not found');
      }

      return appointment.toPrimitives();
    } catch (error) {
      console.log(error);
    }
  }
}
