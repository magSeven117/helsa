import { PrismaClient } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { format } from 'date-fns';
import { User } from '../../../user/domain/user';
import { Doctor } from '../../domain/doctor';
import { DoctorSearcher } from '../../domain/doctor-index-store';

export class PrismaDoctorSearcher implements DoctorSearcher {
  constructor(private client: PrismaClient) {}
  index(): Promise<string | Buffer> {
    throw new Error('Method not implemented.');
  }
  async save(
    user: User,
    doctor: Doctor,
    appointments: {
      date: string;
      appointments: number;
      availabilities: number;
      day: string;
    }[],
  ) {
    try {
      await this.client.searchDoctor.delete({ where: { doctorId: doctor.id.value } });
    } catch (error) {
      console.log('Doctor not found in index');
    }
    await this.client.searchDoctor.create({
      data: {
        doctorId: doctor.id.value,
        userId: user.id.value,
        name: user.name.value,
        specialty: doctor.specialty?.name.value ?? '',
        score: doctor.score.value,
        experience: doctor.experience.value,
        searchSchedules: {
          createMany: {
            data:
              appointments.map((a) => ({
                day: a.day,
                appointments: a.appointments,
                availabilities: a.availabilities,
              })) ?? [],
          },
        },
        days: {
          createMany: {
            data:
              doctor.schedule?.days.map((d) => ({
                day: d.day.value,
                hours: d.hours.length,
              })) ?? [],
          },
        },
      },
    });
  }
  async search(
    {
      term,
      availability,
      minRate,
      experience,
    }: {
      term?: string;
      availability?: string;
      minRate?: number;
      experience?: number;
    },
    limit = 10,
  ): Promise<Doctor[]> {
    // Primero intentar buscar en la tabla de índice optimizado
    const searchDoctors = await this.client.searchDoctor.findMany({
      where: {
        AND: [
          ...(term ? [{ name: { search: term } }] : []),
          ...(availability
            ? [
                {
                  OR: [
                    { searchSchedules: { some: { day: availability, availabilities: { gt: 0 } } } },
                    { days: { some: { day: format(new Date(availability), 'EEEE').toLowerCase(), hours: { gt: 0 } } } },
                  ],
                },
              ]
            : []),
          ...(experience ? [{ experience: { gte: experience } }] : []),
          ...(minRate ? [{ score: { gte: minRate } }] : []),
        ],
      },
      include: {
        doctor: {
          include: {
            appointments: true,
            schedule: true,
            user: true,
            specialty: true,
            prices: true,
            educations: true,
          },
        },
      },
      take: limit,
    });

    // Si encontramos resultados en el índice, los devolvemos
    if (searchDoctors.length > 0) {
      return searchDoctors.map((doctor: any) => Doctor.fromPrimitives(doctor.doctor as Primitives<Doctor>));
    }

    // Si no hay resultados en el índice, buscar directamente en la tabla doctor
    const doctors = await this.client.doctor.findMany({
      where: {
        AND: [
          ...(term ? [{ user: { name: { contains: term, mode: 'insensitive' } } }] : []),
          ...(experience ? [{ experience: { gte: experience } }] : []),
          ...(minRate ? [{ score: { gte: minRate } }] : []),
        ],
      },
      include: {
        appointments: true,
        schedule: true,
        user: true,
        specialty: true,
        prices: true,
        educations: true,
      },
      take: limit,
    });

    return doctors.map((doctor: any) => Doctor.fromPrimitives(doctor as Primitives<Doctor>));
  }
}
