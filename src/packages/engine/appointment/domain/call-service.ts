import { Primitives } from '@helsa/ddd/types/primitives';
import { Doctor } from '../../doctor/domain/doctor';
import { Patient } from '../../patient/domain/patient';

export interface CallService {
  createRoom(appointmentId: string, doctor: Primitives<Doctor>, patient: Primitives<Patient>): Promise<void>;
}
