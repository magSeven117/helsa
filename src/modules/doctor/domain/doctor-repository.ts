import { Criteria } from '@/modules/shared/domain/core/criteria';
import { Doctor } from './doctor';
import { Specialty } from './specialty';

export interface DoctorRepository {
  save(doctor: Doctor): Promise<void>;
  findByCriteria(criteria: Criteria): Promise<Doctor[]>;
  getByCriteria(criteria: Criteria): Promise<Doctor>;
  getSpecialties(): Promise<Specialty[]>;
}
