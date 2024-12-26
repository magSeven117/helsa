import { Criteria } from '@helsa/ddd/core/criteria';
import { ConsultingRoomAddress } from './consulting-room-address';
import { Doctor } from './doctor';
import { Education } from './educations';
import { Price } from './price';
import { Schedule } from './schedule';
import { Specialty } from './specialty';

export interface DoctorRepository {
  save(doctor: Doctor): Promise<void>;
  saveConsultingRoomAddress(doctorId: string, address?: ConsultingRoomAddress): Promise<void>;
  saveSchedule(doctorId: string, schedule?: Schedule): Promise<void>;
  saveEducations(doctorId: string, educations: Education[]): Promise<void>;
  savePrices(doctorId: string, prices: Price[]): Promise<void>;
  findByCriteria(criteria: Criteria): Promise<Doctor[]>;
  search({
    term,
    availability,
    minRate,
    specialties,
    experience,
  }: {
    term?: string;
    availability?: string;
    minRate?: number;
    specialties?: string[];
    experience?: number;
  }): Promise<Doctor[]>;
  getByCriteria(criteria: Criteria): Promise<Doctor>;
  getPrices(doctorId: string): Promise<Price[]>;
  getSpecialties(): Promise<Specialty[]>;
  removeEducation(doctorId: string, educationId: string): Promise<void>;
  removePrice(doctorId: string, priceId: string): Promise<void>;
}
