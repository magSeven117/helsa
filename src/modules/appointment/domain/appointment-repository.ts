import { Criteria } from '@/modules/shared/domain/core/criteria';
import { Appointment } from './appointment';

export interface AppointmentRepository {
  search(criteria: Criteria): Promise<Appointment[]>;
}
