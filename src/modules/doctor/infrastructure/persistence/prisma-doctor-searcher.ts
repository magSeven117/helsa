import { Primitives } from '@/modules/shared/domain/types/primitives';
import { User } from '@/modules/user/domain/user';
import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';
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
    }[]
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
  async search({
    term,
    availability,
    minRate,
    specialties,
    experience,
  }: {
    term?: string;
    availability?: string;
    minRate?: number;
    specialties?: string[];
    experience?: number;
  }) {
    const doctors = await this.client.searchDoctor.findMany({
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
          ...(specialties ? [{ specialty: { in: specialties } }] : []),
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
            appointmentTypes: true,
          },
        },
      },
    });
    return doctors.map((doctor) => Doctor.fromPrimitives(doctor.doctor as unknown as Primitives<Doctor>));
  }
}
