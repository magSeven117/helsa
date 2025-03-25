import { AppointmentCriteria } from 'appointment/domain/appointment-criteria';
import { AppointmentRepository } from '../domain/appointment-repository';

export class CheckAppointmentsToFinalize {
  constructor(private readonly repository: AppointmentRepository) {}

  async run(): Promise<void> {
    const response = await this.repository.search(AppointmentCriteria.listPastHourAppointments(), { room: true });
    const appointments = response.getItems();

    const savePromises = [];
    for (const appointment of appointments) {
      appointment.finalize();
      savePromises.push(this.repository.save(appointment));
    }

    await Promise.all(savePromises);
  }
}
