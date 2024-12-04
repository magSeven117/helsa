import { Criteria, Direction, Operator } from '@/modules/shared/domain/core/criteria';
import { AppointmentRepository } from '../domain/appointment-repository';
import { AppointmentStatusEnum } from '../domain/status';

export class GetUpcomingAppointment {
  constructor(private readonly repository: AppointmentRepository) {}

  async run(patientId: string) {
    const appointments = await this.repository.search(
      Criteria.fromValues(
        [
          { field: 'patientId', value: patientId, operator: Operator.EQUAL },
          { field: 'date', value: new Date().toISOString(), operator: Operator.GT },
          { field: 'status', value: AppointmentStatusEnum.SCHEDULED, operator: Operator.EQUAL },
        ],
        { field: 'date', order: Direction.DESC },
        { limit: 5, offset: 0 }
      )
    );

    return appointments.map((appointment) => appointment.toPrimitives());
  }
}
