import { Appointment } from '@/modules/appointment/domain/appointment';
import { User } from '@/modules/user/domain/user';
import { Doctor } from './doctor';

export interface DoctorIndexStore {
  save(doctor: Doctor, user: User, appointments: Appointment[]): Promise<void>;
  search(criteria: { term?: string; availability?: Date; minRate?: number; specialties?: string[] }): Promise<any[]>;
}
