import { Appointment } from '@/modules/appointment/domain/appointment';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { User } from '@/modules/user/domain/user';
import { AnyOrama, create, insert, search } from '@orama/orama';
import { persist, restore } from '@orama/plugin-data-persistence';
import { format } from 'date-fns';
import { Doctor } from '../../domain/doctor';
import { DoctorSearcher } from '../../domain/doctor-index-store';

const doctorSchema = {
  doctorId: 'string',
  embeddings: 'vector[1536]',
  doctor: {
    doctorId: 'string',
    userId: 'string',
    email: 'string',
    name: 'string',
    specialty: 'string',
    score: 'number',
    experience: 'number',
    schedule: {
      date: 'string',
      appointments: 'number',
      day: {
        availabilities: 'number',
        name: 'string',
      },
    },
  },
} as const;

export class OramaDoctorSearcher implements DoctorSearcher {
  private oramaClient!: AnyOrama;
  constructor() {}
  index(): Promise<string | Buffer> {
    throw new Error('Method not implemented.');
  }
  async initialize(doctorIndex: any) {
    if (doctorIndex) {
      this.oramaClient = await restore('json', doctorIndex);
    } else {
      this.oramaClient = create({
        schema: doctorSchema,
      });
    }
  }

  async save(
    user: User,
    doctor: Doctor,
    appointments: {
      date: string;
      appointments: Primitives<Appointment>[];
      day: { availabilities: number; name: string };
    }[]
  ) {
    const userPrimitives = user.toPrimitives();
    const doctorPrimitives = doctor.toPrimitives();
    await insert(this.oramaClient, {
      doctorId: doctorPrimitives.id,
      userId: userPrimitives.id,
      name: userPrimitives.name,
      email: userPrimitives.email,
      specialty: doctorPrimitives.specialty?.id,
      score: doctorPrimitives.score,
      experience: doctorPrimitives.experience,
      schedule: appointments.map((appointment) => ({
        date: appointment.date,
        appointments: appointment.appointments.length,
        day: appointment.day,
      })),
    });
  }

  async getIndex() {
    return await persist(this.oramaClient, 'json');
  }

  async search(params: { term?: string; availability?: Date; minRate?: number; specialties?: string[] }) {
    const date = params.availability ? format(params.availability, 'yyyy-MM-dd') : null;
    const response = await search(this.oramaClient, {
      term: params.term,
      where: {
        ...(date ? { 'doctor.schedule.date': date } : {}),
        ...(params.minRate ? { score: { gt: params.minRate } } : {}),
        ...(params.specialties ? { 'doctor.specialty': { in: params.specialties } } : {}),
      },
    });
    return response.hits;
  }

  async list({ term }: { term: string }) {
    await search(this.oramaClient, {
      term,
      where: {
        'doctor.appointments.count': {
          lt: 0,
        },
      },
    });
  }
}
