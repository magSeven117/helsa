import { AppointmentCriteria } from '../domain/appointment-criteria';
import { AppointmentRepository } from '../domain/appointment-repository';

export class SetReadyAppointments {
  constructor(private readonly repository: AppointmentRepository) {}

  async run(): Promise<void> {
    const response = await this.repository.search(AppointmentCriteria.listNextAppointmentsInTheNextHour());
    const appointments = response.getItems();
    const savePromises = [];
    for (const appointment of appointments) {
      appointment.markAsReady();
      savePromises.push(this.repository.save(appointment));
    }

    await Promise.all(savePromises);
  }
}
