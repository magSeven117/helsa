import { AppointmentRepository } from 'appointment/domain/appointment-repository';

export class StartAppointment {
  constructor(private readonly repository: AppointmentRepository) {}

  async run(appointmentId: string): Promise<void> {
    const appointment = await this.repository.get(appointmentId, { room: true });

    if (!appointment) {
      return;
    }

    appointment.start();
    await this.repository.save(appointment);
  }
}
