import { DomainError } from '@helsa/ddd/core/domain-error';

export class PatientNotFoundError extends DomainError {
  constructor(patientId: string) {
    super(`Patient with ID ${patientId} not found`);
  }
}
