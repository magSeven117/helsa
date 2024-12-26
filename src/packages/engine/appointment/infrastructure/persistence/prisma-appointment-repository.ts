import { Collection } from '@helsa/ddd/core/collection.';
import { Criteria } from '@helsa/ddd/core/criteria';
import { Primitives } from '@helsa/ddd/types/primitives';
import { PrismaCriteriaConverter } from '@helsa/database/converter';
import { PrismaClient } from '@helsa/database';
import { AppointmentType } from '../../domain/appointment-type';
import { Appointment } from '../../domain/appointment';
import { AppointmentRepository } from '../../domain/appointment-repository';

export class PrismaAppointmentRepository implements AppointmentRepository {
  private converter = new PrismaCriteriaConverter();
  constructor(private client: PrismaClient) {}

  get model() {
    return this.client.appointment;
  }

  async search(criteria: Criteria): Promise<Collection<Appointment>> {
    const { orderBy, skip, take, where } = this.converter.criteria(criteria);
    const include = {
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
    };

    const [data, count] = await this.client.$transaction([
      this.client.appointment.findMany({
        where,
        orderBy,
        skip,
        take,
        include,
      }),
      this.client.appointment.count({ where }),
    ]);
    const appointments = data.map((appointment) =>
      Appointment.fromPrimitives(appointment as unknown as Primitives<Appointment>)
    );
    return Collection.fromResponse({
      data: appointments,
      total: count,
      skip: skip || 0,
      take: take || 10,
    });
  }

  async save(appointment: Appointment): Promise<void> {
    const { notes, rating, recipe, room, telemetry, doctor, type, patient, price, ...data } =
      appointment.toPrimitives();
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

  async getTypes(): Promise<AppointmentType[]> {
    const types = await this.client.appointmentType.findMany();
    return types.map((type) => AppointmentType.fromPrimitives(type as unknown as Primitives<AppointmentType>));
  }
}
