import { AppointmentTelemetry } from '../../appointment/domain/telemetry';
import { Criteria } from '@helsa/ddd/core/criteria';
import { Patient } from './patient';

export interface PatientRepository {
  save(patient: Patient): Promise<void>;
  find(criteria: Criteria): Promise<Patient | null>;
  search(criteria: Criteria): Promise<Patient[]>;
  getVitals(userId: string): Promise<AppointmentTelemetry[]>;
}
