import { Appointment } from '@/modules/appointment/domain/appointment';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { User } from '@/modules/user/domain/user';
import { Doctor } from './doctor';

export interface DoctorSearcher {
  save(
    user: User,
    doctor: Doctor,
    appointments: {
      date: string;
      appointments: Primitives<Appointment>[];
      day: { availabilities: number; name: string };
    }[]
  ): Promise<void>;
  search(criteria: { term?: string; availability?: string; minRate?: number; specialties?: string[] }): Promise<any[]>;
  index(): Promise<string | Buffer>;
}
