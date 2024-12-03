import { Criteria } from '@/modules/shared/domain/core/criteria';
import { Appointment } from './appointment';

export interface AppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  search(criteria: Criteria): Promise<Appointment[]>;
}
