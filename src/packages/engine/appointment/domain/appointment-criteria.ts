import { Criteria, Operator } from '@helsa/ddd/core/criteria';

export class AppointmentCriteria {
  static searchByDoctorId(doctorId: string): Criteria {
    return Criteria.fromValues([{ field: 'doctorId', value: doctorId, operator: Operator.EQUAL }]);
  }

  static searchByStatus(status: string): Criteria {
    return Criteria.fromValues([{ field: 'status', value: status, operator: Operator.EQUAL }]);
  }

  static searchByDate(date: Date): Criteria {
    return Criteria.fromValues([{ field: 'date', value: date, operator: Operator.EQUAL }]);
  }
  static searchByPatientId(patientId: string): Criteria {
    return Criteria.fromValues([{ field: 'patientId', value: patientId, operator: Operator.EQUAL }]);
  }
}

export type AppointmentFilter = {
  start?: string;
  end?: string;
  states?: string[];
  specialties?: string[];
  types?: string[];
};

export type AppointmentPagination = {
  page?: number;
  pageSize?: number;
};

export type AppointmentSort = {
  sortBy?: string;
  order?: string;
};

export const transformFiltersToCriteria = (filter: AppointmentFilter) => {
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
