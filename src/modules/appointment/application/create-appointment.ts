import { EventBus } from '@/modules/shared/domain/core/domain-event';
import { FormatError } from '@/modules/shared/domain/core/errors/format-error';
import { Appointment } from '../domain/appointment';
import { AppointmentCriteria } from '../domain/appointment-criteria';
import { AppointmentRepository } from '../domain/appointment-repository';

export class CreateAppointment {
  constructor(private appointmentRepository: AppointmentRepository, private eventBus: EventBus) {}

  async run(initDate: Date, symptoms: string, doctorId: string, patientId: string) {
    try {
      console.log('Creating appointment');
      const appointment = await this.appointmentRepository.search(AppointmentCriteria.searchByDate(initDate));
      console.log(appointment.length);
      if (appointment.length >= 1) {
        throw new FormatError('Appointment already exists');
      }

      console.log('Creating new appointment');

      const newAppointment = Appointment.create(initDate, symptoms, patientId, doctorId);

      console.log('Saving appointment', appointment);

      await this.appointmentRepository.save(newAppointment);
      await this.eventBus.publish(newAppointment.pullDomainEvents());
    } catch (error) {
      console.log(error);
    }
  }
}
