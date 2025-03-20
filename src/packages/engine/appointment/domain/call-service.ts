import { Doctor } from '@/src/doctor/domain/doctor';
import { Patient } from '@/src/patient/domain/patient';
import { Primitives } from '@helsa/ddd/types/primitives';

export interface CallService {
  createRoom(appointmentId: string, doctor: Primitives<Doctor>, patient: Primitives<Patient>): Promise<void>;
}
