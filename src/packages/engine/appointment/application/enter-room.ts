import { AppointmentRepository } from '../domain/appointment-repository';

export class EnterRoom {
  constructor(private readonly repository: AppointmentRepository) {}

  async run(appointmentId: string, role: 'PATIENT' | 'DOCTOR'): Promise<void> {
    const appointment = await this.repository.get(appointmentId, { room: true });
    if (!appointment) {
      throw new Error('Room not found');
    }
    appointment.enterRoom(role);
    await this.repository.saveRoom(appointment.room!);
  }
}
