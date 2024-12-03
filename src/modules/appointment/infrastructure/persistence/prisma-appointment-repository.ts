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
      },
    });
    return appointments.map((appointment) =>
      Appointment.fromPrimitives(appointment as unknown as Primitives<Appointment>)
    );
  }

  async save(appointment: Appointment): Promise<void> {
    const { notes, rating, recipe, room, telemetry, ...data } = appointment.toPrimitives();
    console.log('data', data);
    await this.model.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }
}
