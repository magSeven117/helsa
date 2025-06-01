import { NumberValueObject } from '@helsa/ddd/core/value-object';

export class Usage {
  constructor(public freeAppointments: NumberValueObject) {}
}
