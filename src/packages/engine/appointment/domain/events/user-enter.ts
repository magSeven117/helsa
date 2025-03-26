import { DomainEvent } from '@helsa/ddd/core/domain-event';

export type UserEnteredAppointmentData = {
  appointmentId: string;
  role: 'PATIENT' | 'DOCTOR';
};

export class UserEnteredAppointment extends DomainEvent<UserEnteredAppointmentData> {
  static EVENT_NAME: string = 'user-entered-appointment';
  constructor(data: UserEnteredAppointmentData) {
    super({
      id: undefined,
      occurred_on: undefined,
      name: UserEnteredAppointment.EVENT_NAME,
      data: { ...data },
      aggregate: 'appointment',
    });
  }

  public toPrimitive(): any {
    return {
      id: this.id,
      occurred_on: this.occurred_on,
      name: this.name,
      data: this.data,
      aggregate: this.aggregate,
    };
  }
  public isPublic(): boolean {
    return true;
  }
}
