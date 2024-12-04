import { AppointmentCriteria } from '../domain/appointment-criteria';
import { AppointmentRepository } from '../domain/appointment-repository';
import { AppointmentStatusEnum } from '../domain/status';

export class GetDoctorAppointments {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async run(doctorId: string) {
    const criteria = AppointmentCriteria.searchByDoctorId(doctorId).and(
      AppointmentCriteria.searchByStatus(AppointmentStatusEnum.SCHEDULED)
    );
    const appointments = await this.appointmentRepository.search(criteria);
    return appointments;
  }
}
