import { EventBus } from '@helsa/ddd/core/domain-event';
import { FormatError } from '@helsa/ddd/core/errors/format-error';
import { Appointment } from '../domain/appointment';
import { AppointmentCriteria } from '../domain/appointment-criteria';
import { AppointmentRepository } from '../domain/appointment-repository';

export class CreateAppointment {
  constructor(private appointmentRepository: AppointmentRepository, private eventBus: EventBus) {}

  async run(
    id: string,
    date: Date,
    symptoms: string,
    doctorId: string,
    patientId: string,
    typeId: string,
    specialtyId: string,
    priceId: string
  ) {
    try {
      const appointment = await this.appointmentRepository.search(AppointmentCriteria.searchByDate(date));
      if (appointment.getItems().length >= 1) {
        throw new FormatError('Appointment already exists');
      }

      const newAppointment = Appointment.create(id, date, symptoms, patientId, doctorId, typeId, specialtyId, priceId);

      await this.appointmentRepository.save(newAppointment);
      await this.eventBus.publish(newAppointment.pullDomainEvents());
    } catch (error) {
      console.log(error);
    }
  }
}
