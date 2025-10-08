import { Criteria, Direction, Operator } from '@helsa/ddd/core/criteria';
import { AppointmentRepository } from '../domain/appointment-repository';
import { AppointmentStatusEnum } from '../domain/status';

export class GetUpcomingAppointment {
  constructor(private readonly repository: AppointmentRepository) {}

  async run(doctorId: string) {
    // Buscar todas las citas del doctor (sin filtro de fecha)
    const appointments = await this.repository.search(
      Criteria.fromValues(
        [
          { field: 'doctorId', value: doctorId, operator: Operator.EQUAL },
          { field: 'status', value: [AppointmentStatusEnum.SCHEDULED, AppointmentStatusEnum.CONFIRMED, AppointmentStatusEnum.PAYED, AppointmentStatusEnum.READY], operator: Operator.IN },
        ],
        { field: 'date', order: Direction.DESC },
        { limit: 20, offset: 0 }
      )
    );

    return appointments.getItems().map((appointment) => appointment.toPrimitives());
  }
}
