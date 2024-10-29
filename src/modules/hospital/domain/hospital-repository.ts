import { Criteria } from '@/modules/shared/domain/core/criteria';
import { Hospital } from './hospital';

export interface HospitalRepository {
  save(hospital: Hospital): Promise<void>;
  find(criteria: Criteria): Promise<Hospital | null>;
  search(criteria: Criteria): Promise<Hospital[]>;
}
