import { Meta } from '@/modules/shared/domain/core/collection.';
import { Criteria, Direction, Operator } from '@/modules/shared/domain/core/criteria';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { Appointment } from '../domain/appointment';
import { AppointmentCriteria } from '../domain/appointment-criteria';
import { AppointmentRepository } from '../domain/appointment-repository';

export class GetAppointments {
  constructor(private repository: AppointmentRepository) {}

  async run(
    id: string,
    role: string,
    filters: AppointmentFilter,
    pagination?: AppointmentPagination,
    sort?: AppointmentSort
  ): Promise<{ data: Primitives<Appointment>[]; meta: Meta }> {
    let criteria: Criteria;
    criteria = role === 'DOCTOR' ? AppointmentCriteria.searchByDoctorId(id) : AppointmentCriteria.searchByPatientId(id);
    criteria.and(transformFiltersToCriteria(filters));
    if (pagination && pagination.page && pagination.pageSize) {
      criteria.paginate(pagination.pageSize, pagination.page);
    }

    if (sort && sort.order && sort.sortBy) {
      criteria.orderBy(sort.sortBy, sort.order as Direction);
    }
    const response = await this.repository.search(criteria);
    return {
      data: response.getItems().map((appointment) => appointment.toPrimitives()),
      meta: response.getMeta(),
    };
  }
}

type AppointmentFilter = {
  start?: string;
  end?: string;
  states?: string[];
  specialties?: string[];
  types?: string[];
};

type AppointmentPagination = {
  page?: number;
  pageSize?: number;
};

type AppointmentSort = {
  sortBy?: string;
  order?: string;
};

const transformFiltersToCriteria = (filter: AppointmentFilter) => {
  let criteria = Criteria.empty();
  if (filter.start) {
    criteria = criteria.and(
      Criteria.fromValues([{ field: 'date', value: new Date(filter.start), operator: Operator.GTE }])
    );
  }
  if (filter.end) {
    criteria = criteria.and(
      Criteria.fromValues([{ field: 'date', value: new Date(filter.end), operator: Operator.LTE }])
    );
  }
  if (filter.states) {
    criteria = criteria.and(Criteria.fromValues([{ field: 'status', value: filter.states, operator: Operator.IN }]));
  }
  if (filter.specialties) {
    criteria = criteria.and(
      Criteria.fromValues([{ field: 'specialtyId', value: filter.specialties, operator: Operator.IN }])
    );
  }
  if (filter.types) {
    criteria = criteria.and(Criteria.fromValues([{ field: 'typeId', value: filter.types, operator: Operator.IN }]));
  }
  return criteria;
};
