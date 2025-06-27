import { DomainError } from '@helsa/ddd/core/domain-error';

export class HourAlreadyTakenError extends DomainError {
  constructor(date: Date) {
    super(`The hour ${date.toISOString()} is already taken`);
  }
}
