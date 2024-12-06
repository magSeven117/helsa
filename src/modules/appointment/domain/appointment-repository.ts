import { Collection } from '@/modules/shared/domain/core/collection.';
import { Criteria } from '@/modules/shared/domain/core/criteria';
import { Appointment } from './appointment';

export interface AppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  search(criteria: Criteria): Promise<Collection<Appointment>>;
  get(id: string): Promise<Appointment | null>;
}
