import { Criteria } from '@/modules/shared/domain/core/Criteria';
import { Primitives } from '@/modules/shared/domain/types/Primitives';
import { PrismaCriteriaConverter } from '@/modules/shared/infrastructure/persistence/prisma/PrismaCriteriaConverter';
import { PrismaClient } from '@prisma/client';
import { Doctor } from '../../domain/Doctor';
import { DoctorRepository } from '../../domain/DoctorRepository';

export class PrismaDoctorRepository implements DoctorRepository {
  private converter: PrismaCriteriaConverter = new PrismaCriteriaConverter();
  constructor(private client: PrismaClient) {}

  get model() {
    return this.client.doctor;
  }

  async save(doctor: Doctor): Promise<void> {
    await this.model.upsert({
      where: { id: doctor.id.value },
      update: doctor.toPrimitives(),
      create: doctor.toPrimitives(),
    });
  }
  async findByCriteria(criteria: Criteria): Promise<Doctor[]> {
    const query = this.converter.criteria(criteria);
    const doctors = await this.model.findMany(query);
    return doctors.map((doctor) => Doctor.fromPrimitives(doctor as Primitives<Doctor>));
  }
  async getByCriteria(criteria: Criteria): Promise<Doctor> {
    const { where } = this.converter.criteria(criteria);
    const doctor = await this.model.findFirst({ where });
    if (!doctor) throw new Error('Doctor not found');
    return Doctor.fromPrimitives(doctor as Primitives<Doctor>);
  }
}
