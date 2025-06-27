import { DomainError } from '@helsa/ddd/core/domain-error';

export class AppointmentNotFoundError extends DomainError {
  constructor(appointmentId: string) {
    super(`Appointment with ID ${appointmentId} not found`);
  }
}
