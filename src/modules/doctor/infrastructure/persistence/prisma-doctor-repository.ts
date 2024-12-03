import { Criteria } from '@/modules/shared/domain/core/criteria';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { PrismaCriteriaConverter } from '@/modules/shared/infrastructure/persistence/prisma/prisma-criteria-converter';
import { PrismaClient } from '@prisma/client';
import { AppointmentType } from '../../domain/appointment-type';
import { ConsultingRoomAddress } from '../../domain/consulting-room-address';
import { Doctor } from '../../domain/doctor';
import { DoctorRepository } from '../../domain/doctor-repository';
import { Education } from '../../domain/educations';
import { Schedule } from '../../domain/schedule';
import { Specialty } from '../../domain/specialty';

export class PrismaDoctorRepository implements DoctorRepository {
  private converter: PrismaCriteriaConverter = new PrismaCriteriaConverter();
  constructor(private client: PrismaClient) {}

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

  async saveAppointmentTypes(doctorId: string, appointmentTypes: AppointmentType[]): Promise<void> {
    if (!appointmentTypes) return;
    for (const type of appointmentTypes) {
      const data = type.toPrimitives();
      await this.client.appointmentType.upsert({
        where: { id: data.id },
        update: {
          name: data.name,
          duration: data.duration,
          color: data.color,
        },
        create: {
          id: data.id,
          name: data.name,
          duration: data.duration,
          doctorId,
          color: data.color,
          system: data.system,
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
    const { where } = this.converter.criteria(criteria);
    const doctor = await this.model.findFirst({
      where,
      include: { consultingRoomAddress: true, educations: true, schedule: true, appointmentTypes: true },
    });
    if (!doctor) throw new Error('Doctor not found');
    return Doctor.fromPrimitives(doctor as unknown as Primitives<Doctor>);
  }

  async getSpecialties() {
    const specialties = await this.client.specialty.findMany();
    return specialties.map((specialty) => Specialty.fromPrimitives(specialty));
  }

  async removeEducation(doctorId: string, educationId: string): Promise<void> {
    await this.client.education.delete({ where: { id: educationId, doctorId } });
  }

  async search(): Promise<Doctor[]> {
    const doctors = await this.model.findMany({
      where: {
        OR: [
          {
            schedule: {},
          },
          {
            appointments: { some: { date: {} } },
          },
        ],
      },
      include: { consultingRoomAddress: true, educations: true, schedule: true, appointments: true },
    });
    return doctors.map((doctor) => Doctor.fromPrimitives(doctor as unknown as Primitives<Doctor>));
  }

  async getAppointmentsTypes(doctorId: string): Promise<AppointmentType[]> {
    const types = await this.client.appointmentType.findMany({
      where: { OR: [{ doctorId }, { system: true }] },
      orderBy: { createdAt: 'desc' },
    });
    return types.map((type) => AppointmentType.fromPrimitives(type as unknown as Primitives<AppointmentType>));
  }

  async removeAppointmentType(doctorId: string, appointmentTypeId: string): Promise<void> {
    await this.client.appointmentType.delete({ where: { id: appointmentTypeId, doctorId } });
  }
}
