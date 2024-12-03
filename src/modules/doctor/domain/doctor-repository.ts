import { Criteria } from '@/modules/shared/domain/core/criteria';
import { AppointmentType } from './appointment-type';
import { ConsultingRoomAddress } from './consulting-room-address';
import { Doctor } from './doctor';
import { Education } from './educations';
import { Schedule } from './schedule';
import { Specialty } from './specialty';

export interface DoctorRepository {
  save(doctor: Doctor): Promise<void>;
  saveConsultingRoomAddress(doctorId: string, address?: ConsultingRoomAddress): Promise<void>;
  saveSchedule(doctorId: string, schedule?: Schedule): Promise<void>;
  saveEducations(doctorId: string, educations: Education[]): Promise<void>;
  saveAppointmentTypes(doctorId: string, appointmentTypes: AppointmentType[]): Promise<void>;
  findByCriteria(criteria: Criteria): Promise<Doctor[]>;
  getByCriteria(criteria: Criteria): Promise<Doctor>;
  getSpecialties(): Promise<Specialty[]>;
  getAppointmentsTypes(doctorId: string): Promise<AppointmentType[]>;
  removeEducation(doctorId: string, educationId: string): Promise<void>;
  removeAppointmentType(doctorId: string, appointmentTypeId: string): Promise<void>;
}
