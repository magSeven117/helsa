import { Criteria } from '@helsa/ddd/core/criteria';
import { Primitives } from '@helsa/ddd/types/primitives';
import { PrismaCriteriaConverter } from '@helsa/database/converter';
import { PrismaClient } from '@helsa/database';
import { ConsultingRoomAddress } from '../../domain/consulting-room-address';
import { Doctor } from '../../domain/doctor';
import { DoctorRepository } from '../../domain/doctor-repository';
import { Education } from '../../domain/educations';
import { Price } from '../../domain/price';
import { Schedule } from '../../domain/schedule';
import { Specialty } from '../../domain/specialty';
import { PrismaDoctorSearcher } from './prisma-doctor-searcher';

export class PrismaDoctorRepository implements DoctorRepository {
  private converter: PrismaCriteriaConverter = new PrismaCriteriaConverter();
  private doctorSearcher: PrismaDoctorSearcher;
  constructor(private client: PrismaClient) {
    this.doctorSearcher = new PrismaDoctorSearcher(client);
  }

  get model() {
    return this.client.doctor;
  }

  async save(doctor: Doctor): Promise<void> {
    const data = doctor.toPrimitives();
    await this.model.upsert({
      where: { id: doctor.id.value },
      update: {
        userId: data.userId,
        licenseMedicalNumber: data.licenseMedicalNumber,
        specialtyId: data.specialtyId,
        score: data.score,
        experience: data.experience,
      },
      create: {
        id: doctor.id.value,
        userId: data.userId,
        licenseMedicalNumber: data.licenseMedicalNumber,
        specialtyId: data.specialtyId,
        score: data.score,
        experience: data.experience,
      },
    });
  }

  async saveConsultingRoomAddress(doctorId: string, address?: ConsultingRoomAddress): Promise<void> {
    if (!address) return;
    const data = address.toPrimitives();
    await this.client.consultingRoomAddress.upsert({
      where: { doctorId },
      update: {
        address: data.address,
        city: data.city,
        roomCoordinates: data.roomCoordinates,
      },
      create: {
        doctorId,
        address: data.address,
        city: data.city,
        roomCoordinates: data.roomCoordinates,
      },
    });
  }

  async saveSchedule(doctorId: string, schedule?: Schedule): Promise<void> {
    if (!schedule) return;
    const data = schedule.toPrimitives();
    await this.client.schedule.upsert({
      where: { doctorId },
      update: {
        days: data.days,
      },
      create: {
        doctorId,
        days: data.days,
        appointmentDuration: data.appointmentDuration,
        maxAppointmentsPerDay: data.maxAppointmentsPerDay,
      },
    });
  }

  async saveEducations(doctorId: string, educations: Education[]): Promise<void> {
    if (!educations) return;
    for (const education of educations) {
      const data = education.toPrimitives();
      await this.client.education.upsert({
        where: { id: data.id },
        update: {
          title: data.title,
          institution: data.institution,
          graduatedAt: data.graduatedAt,
        },
        create: {
          id: data.id,
          title: data.title,
          institution: data.institution,
          graduatedAt: data.graduatedAt,
          doctorId,
        },
      });
    }
  }

  async savePrices(doctorId: string, prices: Price[]): Promise<void> {
    if (!prices) return;
    for (const price of prices) {
      const data = price.toPrimitives();
      await this.client.price.upsert({
        where: { id: data.id, doctorId },
        update: {
          amount: data.amount,
          currency: data.currency,
          typeId: data.typeId,
          duration: data.duration,
          name: data.name,
        },
        create: {
          id: data.id,
          amount: data.amount,
          currency: data.currency,
          typeId: data.typeId,
          duration: data.duration,
          doctorId: data.doctorId,
          name: data.name,
        },
      });
    }
  }

  async findByCriteria(criteria: Criteria): Promise<Doctor[]> {
    const query = this.converter.criteria(criteria);
    const doctors = await this.model.findMany(query);
    return doctors.map((doctor) => Doctor.fromPrimitives(doctor as unknown as Primitives<Doctor>));
  }

  async getByCriteria(criteria: Criteria): Promise<Doctor> {
    const { where, include } = this.converter.criteria(criteria);
    const doctor = await this.model.findFirst({
      where,
      include,
    });
    if (!doctor) throw new Error('Doctor not found');
    return Doctor.fromPrimitives(doctor as unknown as Primitives<Doctor>);
  }

  async getSpecialties() {
    const specialties = await this.client.specialty.findMany();
    return specialties.map((specialty) => Specialty.fromPrimitives(specialty));
  }

  async getPrices(doctorId: string): Promise<Price[]> {
    const prices = await this.client.price.findMany({ where: { doctorId }, include: { type: true } });
    return prices.map((price) => Price.fromPrimitives(price));
  }

  async removeEducation(doctorId: string, educationId: string): Promise<void> {
    await this.client.education.delete({ where: { id: educationId, doctorId } });
  }

  async removePrice(doctorId: string, priceId: string): Promise<void> {
    await this.client.price.delete({ where: { id: priceId, doctorId } });
  }

  async search(filters: {
    term?: string;
    availability?: string;
    minRate?: number;
    specialties?: string[];
    experience?: number;
  }) {
    return await this.doctorSearcher.search(filters);
  }
}
