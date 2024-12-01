import { AppointmentRepository } from '../domain/appointment-repository';

export class CreateAppointment {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async run() {}
}
