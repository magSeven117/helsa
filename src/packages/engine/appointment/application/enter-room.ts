import { EventBus } from '@helsa/ddd/core/domain-event';
import { AppointmentRepository } from '../domain/appointment-repository';

export class EnterRoom {
  constructor(
    private readonly repository: AppointmentRepository,
    private bus: EventBus,
  ) {}

  async run(appointmentId: string, role: 'PATIENT' | 'DOCTOR'): Promise<void> {
    const appointment = await this.repository.get(appointmentId, { room: true });
    if (!appointment) {
      throw new Error('Room not found');
    }
    if (!appointment.room) {
      appointment.createRoom();
    }
    appointment.enterRoom(role);
    await this.repository.saveRoom(appointment.room!);
    await this.bus.publish(appointment.pullDomainEvents());
  }
}
