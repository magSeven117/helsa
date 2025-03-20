import { Meta } from '@helsa/ddd/core/collection.';
import { Direction } from '@helsa/ddd/core/criteria';
import { NotFoundError } from '@helsa/ddd/core/errors/not-found-error';
import { Primitives } from '@helsa/ddd/types/primitives';
import { GetDoctor } from '../../doctor/application/services/get-doctor';
import { Appointment } from '../domain/appointment';
import {
  AppointmentCriteria,
  AppointmentFilter,
  AppointmentPagination,
  AppointmentSort,
  transformFiltersToCriteria,
} from '../domain/appointment-criteria';
import { AppointmentRepository } from '../domain/appointment-repository';

export class GetDoctorAppointments {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private doctorGetter: GetDoctor,
  ) {}

  async run(
    id: string,
    filters: AppointmentFilter,
    pagination?: AppointmentPagination,
    sort?: AppointmentSort,
  ): Promise<{ data: Primitives<Appointment>[]; meta: Meta }> {
    const doctor = await this.doctorGetter.run(id, 'id');

    if (!doctor) {
      throw new NotFoundError(`Doctor of user ${id} not found`);
    }

    const criteria = AppointmentCriteria.searchByDoctorId(doctor.id);

    if (filters.end || filters.start || filters.specialties || filters.states || filters.types) {
      criteria.and(transformFiltersToCriteria(filters));
    }

    criteria.paginate(pagination?.pageSize ?? 10, pagination?.page ?? 0);

    if (sort && sort.order && sort.sortBy) {
      criteria.orderBy(sort.sortBy, sort.order as Direction);
    } else {
      criteria.orderBy('day', Direction.DESC);
    }

    const response = await this.appointmentRepository.search(criteria);

    return {
      data: response.getItems().map((appointment) => appointment.toPrimitives()),
      meta: response.getMeta(),
    };
  }
}
