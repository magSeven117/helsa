import { DoctorRepository } from '../../domain/doctor-repository';

export class RemoveAppointmentType {
  constructor(private repository: DoctorRepository) {}

  async run(doctorId: string, appointmentTypeId: string): Promise<void> {
    await this.repository.removeAppointmentType(doctorId, appointmentTypeId);
  }
}
