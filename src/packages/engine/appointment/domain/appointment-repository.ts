import { Collection } from '@helsa/ddd/core/collection.';
import { Criteria } from '@helsa/ddd/core/criteria';
import { Document } from '../../document/domain/document';
import { AppointmentType } from '../domain/appointment-type';
import { Appointment } from './appointment';
import { AppointmentNote } from './note';
import { AppointmentRoom } from './room';
import { Symptom } from './symptom';
import { AppointmentTelemetry } from './telemetry';
export interface AppointmentRepository {
  save(appointment: Appointment, symptoms?: string[]): Promise<void>;
  search(criteria: Criteria, otherInclude?: any): Promise<Collection<Appointment>>;
  get(id: string, include?: any): Promise<Appointment | null>;
  getTypes(): Promise<AppointmentType[]>;
  getSymptoms(): Promise<Symptom[]>;
  getAppointmentDocuments(appointmentId: string): Promise<Document[]>;
  getAppointmentNotes(appointmentId: string): Promise<AppointmentNote[]>;
  saveNotes(note: AppointmentNote): Promise<void>;
  saveTelemetry(appointment: AppointmentTelemetry, appointmentId: string): Promise<void>;
  saveRoom(room: AppointmentRoom): Promise<void>;
}
