import { Criteria } from '@/modules/shared/domain/core/criteria';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { PrismaCriteriaConverter } from '@/modules/shared/infrastructure/persistence/prisma/prisma-criteria-converter';
import { PrismaClient } from '@prisma/client';
import { AppointmentType } from '../../domain/appointment-type';
import { Doctor } from '../../domain/doctor';
import { DoctorRepository } from '../../domain/doctor-repository';
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
    if (doctor.consultingRoomAddress) {
      await this.client.consultingRoomAddress.upsert({
        where: { doctorId: doctor.id.value },
        update: doctor.consultingRoomAddress.toPrimitives(),
        create: {
          ...doctor.consultingRoomAddress.toPrimitives(),
          doctorId: doctor.id.value,
        },
      });
    }
    if (doctor.schedule) {
      await this.client.schedule.upsert({
        where: { doctorId: doctor.id.value },
        update: doctor.schedule.toPrimitives(),
        create: {
          ...doctor.schedule.toPrimitives(),
          doctorId: doctor.id.value,
        },
      });
    }
    await this.saveEducations(doctor.id.value, data.educations);
    await this.saveAppointmentTypes(doctor.id.value, data.appointmentTypes);
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

  async saveEducations(doctorId: string, educations: Primitives<Doctor>['educations']): Promise<void> {
    if (!educations) return;
    for (const education of educations) {
      await this.client.education.upsert({
        where: { id: education.id },
        update: {
          title: education.title,
          institution: education.institution,
          graduatedAt: education.graduatedAt,
        },
        create: {
          id: education.id,
          title: education.title,
          institution: education.institution,
          graduatedAt: education.graduatedAt,
          doctorId,
        },
      });
    }
  }

  async saveAppointmentTypes(
    doctorId: string,
    appointmentTypes: Primitives<Doctor>['appointmentTypes']
  ): Promise<void> {
    if (!appointmentTypes) return;
    for (const type of appointmentTypes) {
      await this.client.appointmentType.upsert({
        where: { id: type.id },
        update: {
          name: type.name,
          duration: type.duration,
          color: type.color,
        },
        create: {
          id: type.id,
          name: type.name,
          duration: type.duration,
          doctorId,
          color: type.color,
          system: type.system,
        },
      });
    }
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
    const types = await this.client.appointmentType.findMany({ where: { OR: [{ doctorId }, { system: true }] } });
    return types.map((type) => AppointmentType.fromPrimitives(type as unknown as Primitives<AppointmentType>));
  }
}
