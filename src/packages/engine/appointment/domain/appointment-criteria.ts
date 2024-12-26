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
