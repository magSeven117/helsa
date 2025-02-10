import { NotFoundError } from '@helsa/ddd/core/errors/not-found-error';
import { Primitives } from '@helsa/ddd/types/primitives';
import { AppointmentRepository } from '../domain/appointment-repository';
import { AppointmentTelemetry } from '../domain/telemetry';

export class SaveTelemetry {
  constructor(private repository: AppointmentRepository) {}

  async run(data: Primitives<AppointmentTelemetry>) {
    const appointment = await this.repository.get(data.appointmentId, { telemetry: true });
    if (!appointment) throw new NotFoundError('Appointment not found');
    appointment.saveTelemetry(data);

    await this.repository.saveTelemetry(appointment.telemetry!, data.appointmentId);
  }
}
