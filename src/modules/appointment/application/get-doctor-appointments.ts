import { AppointmentCriteria } from '../domain/appointment-criteria';
import { AppointmentRepository } from '../domain/appointment-repository';

export class GetDoctorAppointments {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async run(doctorId: string) {
    const criteria = AppointmentCriteria.searchByDoctorId(doctorId);
    const appointments = await this.appointmentRepository.search(criteria);
    return appointments;
  }
}
