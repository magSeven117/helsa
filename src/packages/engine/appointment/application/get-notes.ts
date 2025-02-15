import { AppointmentRepository } from '../domain/appointment-repository';

export class GetNotes {
  constructor(private readonly repository: AppointmentRepository) {}

  async run(appointmentId: string) {
    const notes = await this.repository.getAppointmentNotes(appointmentId);

    return notes.map((note) => note.toPrimitives());
  }
}
