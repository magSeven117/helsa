import { Criteria } from '@/modules/shared/domain/core/criteria';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { PrismaCriteriaConverter } from '@/modules/shared/infrastructure/persistence/prisma/prisma-criteria-converter';
import { PrismaClient } from '@prisma/client';
import { Appointment } from '../../domain/appointment';
import { AppointmentRepository } from '../../domain/appointment-repository';

export class PrismaAppointmentRepository implements AppointmentRepository {
  private converter = new PrismaCriteriaConverter();
  constructor(private client: PrismaClient) {}

  get model() {
    return this.client.appointment;
  }

  async search(criteria: Criteria): Promise<Appointment[]> {
    const { orderBy, skip, take, where } = this.converter.criteria(criteria);
    const appointments = await this.model.findMany({
      where,
      orderBy,
      skip,
      take,
      include: {
        room: true,
        rating: true,
        telemetry: true,
        recipes: true,
        notes: true,
        type: true,
        doctor: {
          include: {
            user: true,
          },
        },
      },
    });
    return appointments.map((appointment) =>
      Appointment.fromPrimitives(appointment as unknown as Primitives<Appointment>)
    );
  }

  async save(appointment: Appointment): Promise<void> {
    const { notes, rating, recipe, room, telemetry, doctor, type, patient, ...data } = appointment.toPrimitives();
    console.log('data', data);
    await this.model.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }

  async get(id: string): Promise<Appointment | null> {
    const appointment = await this.model.findUnique({
      where: { id },
      include: {
        room: true,
        rating: true,
        telemetry: true,
        recipes: true,
        notes: true,
        type: true,
        doctor: {
          include: {
            user: true,
            specialty: true,
          },
        },
        patient: {
          include: {
            user: true,
            allergies: true,
            diseases: true,
            contacts: true,
            vaccines: true,
            surgeries: true,
          },
        },
      },
    });
    if (!appointment) {
      return null;
    }
    return Appointment.fromPrimitives(appointment as unknown as Primitives<Appointment>);
  }
}
