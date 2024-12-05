import { NotFoundError } from '@/modules/shared/domain/core/errors/not-found-error';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { Appointment } from '../domain/appointment';
import { AppointmentRepository } from '../domain/appointment-repository';

export class GetAppointment {
  constructor(private readonly repository: AppointmentRepository) {}

  async run(id: string): Promise<Primitives<Appointment> | void> {
    try {
      const appointment = await this.repository.get(id);
      if (!appointment) {
        throw new NotFoundError('Appointment not found');
      }

      return appointment.toPrimitives();
    } catch (error) {
      console.log(error);
    }
  }
}
