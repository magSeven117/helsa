import { Appointment } from '@/src/appointment/domain/appointment';
import { User } from '@/src/user/domain/user';
import { Doctor } from './doctor';

export interface EmbeddingDoctor {
  embed(doctor: Doctor, user: User, appointments: Record<string, Appointment[]>): Promise<number[]>;
}
