import { DomainError } from '@helsa/ddd/core/domain-error';

export class DoctorNotFoundError extends DomainError {
  constructor(doctorId: string) {
    super(`Doctor with ID ${doctorId} not found`);
  }
}
