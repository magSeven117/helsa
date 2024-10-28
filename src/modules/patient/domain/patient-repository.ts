import { Criteria } from '@/modules/shared/domain/core/criteria';
import { Patient } from './patient';

export interface PatientRepository {
  save(patient: Patient): Promise<void>;
  find(id: string): Promise<Patient | null>;
  search(criteria: Criteria): Promise<Patient[]>;
}
