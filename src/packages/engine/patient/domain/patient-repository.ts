import { AppointmentTelemetry } from '../../appointment/domain/telemetry';
import { Criteria } from '@helsa/ddd/core/criteria';
import { Patient } from './patient';
import { DoctorPatientWithStats, DoctorPatientFilter, DoctorPatientPagination, DoctorPatientSort } from '../application/services/get-doctor-patients';

export interface PatientRepository {
  save(patient: Patient): Promise<void>;
  find(criteria: Criteria): Promise<Patient | null>;
  search(criteria: Criteria): Promise<Patient[]>;
  getVitals(userId: string): Promise<AppointmentTelemetry[]>;
  getPatientsByDoctorId(
    doctorId: string,
    filters: DoctorPatientFilter,
    pagination?: DoctorPatientPagination,
    sort?: DoctorPatientSort,
  ): Promise<DoctorPatientWithStats[]>;
}
