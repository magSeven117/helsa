import { Criteria } from '@/modules/shared/domain/core/criteria';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { PrismaCriteriaConverter } from '@/modules/shared/infrastructure/persistence/prisma/prisma-criteria-converter';
import { PrismaClient } from '@prisma/client';
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
  }
  async findByCriteria(criteria: Criteria): Promise<Doctor[]> {
    const query = this.converter.criteria(criteria);
    const doctors = await this.model.findMany(query);
    return doctors.map((doctor) => Doctor.fromPrimitives(doctor as unknown as Primitives<Doctor>));
  }
  async getByCriteria(criteria: Criteria): Promise<Doctor> {
    const { where } = this.converter.criteria(criteria);
    const doctor = await this.model.findFirst({ where, include: { consultingRoomAddress: true } });
    if (!doctor) throw new Error('Doctor not found');
    return Doctor.fromPrimitives(doctor as unknown as Primitives<Doctor>);
  }

  async getSpecialties() {
    const specialties = await this.client.specialty.findMany();
    return specialties.map((specialty) => Specialty.fromPrimitives(specialty));
  }
}
