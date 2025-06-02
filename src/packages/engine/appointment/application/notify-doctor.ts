import { Notifier } from '@helsa/ddd/core/notifier';
import { AppointmentRepository } from 'appointment/domain/appointment-repository';
export class NotifyDoctor {
  constructor(
    private readonly notifier: Notifier,
    private readonly repository: AppointmentRepository,
  ) {}

  async execute(appointmentId: string): Promise<void> {
    const appointment = await this.repository.get(appointmentId, {
      patient: {
        include: {
          user: true,
        },
      },
      doctor: {
        include: {
          user: true,
        },
      },
    });
    if (!appointment) {
      throw new Error(`Appointment with ID ${appointmentId} not found`);
    }
    const data = appointment.toPrimitives();

    const payload = {
      date: data.date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
      time: data.hour,
      patient: {
        name: data.patient?.user?.name,
        email: data.patient?.user?.email,
      },
      reason: data.motive,
    };
    await this.notifier.notify('appointment-scheduled', data.doctor?.user?.id ?? '', payload);
  }
}
