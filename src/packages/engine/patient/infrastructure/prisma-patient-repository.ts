import { PrismaClient } from '@helsa/database';
import { PrismaCriteriaConverter } from '@helsa/database/converter';
import { Criteria } from '@helsa/ddd/core/criteria';
import { Primitives } from '@helsa/ddd/types/primitives';
import { subDays } from 'date-fns';
import { AppointmentTelemetry } from '../../appointment/domain/telemetry';
import { Patient } from '../domain/patient';
import { PatientRepository } from '../domain/patient-repository';

export class PrismaPatientRepository implements PatientRepository {
  private converter = new PrismaCriteriaConverter();
  constructor(private client: PrismaClient) {}

  get model() {
    return this.client.patient;
  }

  async save(patient: Patient): Promise<void> {
    const data = patient.toPrimitives();
    await this.model.upsert({
      where: { id: data.id },
      update: {
        userId: data.userId,
        demographic: data.demographic,
        biometric: data.biometric,
      },
      create: {
        id: data.id,
        userId: data.userId,
        demographic: data.demographic,
        biometric: data.biometric,
      },
    });
  }

  async find(criteria: Criteria): Promise<Patient | null> {
    const { where } = this.converter.criteria(criteria);
    const patient = await this.model.findFirst({
      where,
      include: {
        contacts: true,
        vaccines: true,
        surgeries: true,
      },
    });
    if (!patient) return null;
    return Patient.fromPrimitives(patient as unknown as Primitives<Patient>);
  }
  async search(criteria: Criteria): Promise<Patient[]> {
    const { orderBy, skip, take, where } = this.converter.criteria(criteria);
    const patients = await this.model.findMany({
      where,
      include: {
        contacts: true,
        vaccines: true,
        surgeries: true,
      },
      orderBy,
      skip,
      take,
    });
    return patients.map((patient) => Patient.fromPrimitives(patient as unknown as Primitives<Patient>));
  }

  async getVitals(userId: string): Promise<AppointmentTelemetry[]> {
    const patient = await this.model.findFirst({
      where: { userId },
      include: {
        appointments: {
          where: { date: { gte: subDays(new Date(), 30) } },
          select: {
            telemetry: true,
          },
        },
      },
    });
    if (!patient) throw new Error('Patient not found');
    const vitals = patient.appointments
      .filter((a) => a.telemetry)
      .map((appointment) =>
        AppointmentTelemetry.fromPrimitives(appointment.telemetry! as unknown as Primitives<AppointmentTelemetry>)
      );
    return vitals;
  }
}
