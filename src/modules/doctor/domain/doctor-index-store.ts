import { User } from '@/modules/user/domain/user';
import { Doctor } from './doctor';

export interface DoctorSearcher {
  save(
    user: User,
    doctor: Doctor,
    appointments: {
      date: string;
      appointments: number;
      availabilities: number;
      day: string;
    }[]
  ): Promise<void>;
  search(criteria: {
    term?: string;
    availability?: string;
    minRate?: number;
    specialties?: string[];
    experience?: number;
  }): Promise<any[]>;
  index(): Promise<string | Buffer>;
}
