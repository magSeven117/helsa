import { AppointmentNotFoundError } from 'appointment/domain/errors/appointment-not-found-error';
import { AppointmentRepository } from '../domain/appointment-repository';
import { AppointmentNote } from '../domain/note';

export class CreateAppointmentNote {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async run(appointmentId: string, id: string, note: string, isPublic: boolean) {
    try {
      const appointment = await this.appointmentRepository.get(appointmentId);
      if (!appointment) {
        throw new AppointmentNotFoundError(appointmentId);
      }

      const newNote = AppointmentNote.create(id, new Date(), note, isPublic, appointment.id);
      await this.appointmentRepository.saveNotes(newNote);
    } catch (error) {
      console.log(error);
    }
  }
}
