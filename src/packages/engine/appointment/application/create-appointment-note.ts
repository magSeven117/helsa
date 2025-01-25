import { AppointmentRepository } from '../domain/appointment-repository';
import { AppointmentNote } from '../domain/note';

export class CreateAppointmentNote {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async run(appointmentId: string, note: string) {
    try {
      const appointment = await this.appointmentRepository.get(appointmentId);
      if (!appointment) {
        throw new Error('Appointment not found');
      }

      const newNote = AppointmentNote.create(new Date(), note, appointment.id);
      await this.appointmentRepository.saveNotes(newNote);
    } catch (error) {
      console.log(error);
    }
  }
}
