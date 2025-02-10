import { Collection } from '@helsa/ddd/core/collection.';
import { Criteria } from '@helsa/ddd/core/criteria';
import { AppointmentType } from '../domain/appointment-type';
import { Appointment } from './appointment';
import { AppointmentNote } from './note';
import { Symptom } from './symptom';
import { AppointmentTelemetry } from './telemetry';
export interface AppointmentRepository {
  save(appointment: Appointment, symptoms?: string[]): Promise<void>;
  search(criteria: Criteria): Promise<Collection<Appointment>>;
  get(id: string, include?: any): Promise<Appointment | null>;
  getTypes(): Promise<AppointmentType[]>;
  getSymptoms(): Promise<Symptom[]>;
  saveNotes(note: AppointmentNote): Promise<void>;
  saveTelemetry(appointment: AppointmentTelemetry, appointmentId: string): Promise<void>;
}
