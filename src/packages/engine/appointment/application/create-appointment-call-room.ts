import { NotFoundError } from '@helsa/ddd/core/errors/not-found-error';
import { AppointmentRepository } from '../domain/appointment-repository';
import { CallService } from '../domain/call-service';

export class CreateAppointmentCallRoom {
  constructor(
    private readonly repository: AppointmentRepository,
    private readonly service: CallService,
  ) {}

  async run(appointmentId: string): Promise<void> {
    const appointment = await this.repository.get(appointmentId, {
      doctor: {
        include: {
          user: true,
        },
      },
      patient: {
        include: {
          user: true,
        },
      },
    });

    if (!appointment || !appointment.doctor || !appointment.patient) {
      throw new NotFoundError('Doctor or patient not found');
    }

    await this.service.createRoom(appointmentId, appointment.doctor.toPrimitives(), appointment.patient.toPrimitives());
  }
}
