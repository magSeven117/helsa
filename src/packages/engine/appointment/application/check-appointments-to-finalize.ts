import { AppointmentCriteria } from '../domain/appointment-criteria';
import { AppointmentRepository } from '../domain/appointment-repository';
import { CallService } from '../domain/call-service';

export class CheckAppointmentsToFinalize {
  constructor(
    private readonly repository: AppointmentRepository,
    private service: CallService,
  ) {}

  async run(): Promise<void> {
    const response = await this.repository.search(AppointmentCriteria.listPastHourAppointments(), { room: true });
    const appointments = response.getItems();

    const savePromises = [];
    const endPromises = [];
    for (const appointment of appointments) {
      appointment.finalize();
      savePromises.push(this.repository.save(appointment));
      endPromises.push(this.service.endRoom(appointment.id.value!));
    }

    await Promise.all(savePromises);
    await Promise.all(endPromises);
  }
}
