import { User } from '@/modules/user/domain/user';
import { format } from 'date-fns';
import { MongoClient } from 'mongodb';
import { Doctor } from '../../domain/doctor';
import { DoctorIndexStore } from '../../domain/doctor-index-store';

export class MongoDBDoctorIndexStore implements DoctorIndexStore {
  constructor(private client: MongoClient) {}
  get collection() {
    return this.client.db().collection('doctors');
  }
  async saveIndex() {
    const index = {
      name: 'text',
      specialty: 'text',
      address: 'text',
    };
    await this.collection.createIndex(index as any, { name: 'doctor_search' });
  }

  async save(doctor: Doctor, user: User, appointments: any[]) {
    const primitives = doctor.toPrimitives();
    const userPrimitives = user.toPrimitives();

    await this.collection.updateOne(
      { doctorId: primitives.id },
      {
        $set: {
          doctorId: primitives.id,
          name: userPrimitives.fullName,
          specialty: primitives.specialtyId,
          address: primitives.consultingRoomAddress,
          schedule: primitives.schedule,
          rating: primitives.score,
        },
        $addToSet: {
          appointments: { $each: appointments },
        },
      }
    );
  }

  async search({
    term,
    availability,
    minRate,
    specialties,
  }: {
    term?: string;
    availability?: Date;
    minRate?: number;
    specialties?: string[];
  }) {
    const results = await this.collection
      .aggregate([
        ...(term ? this.getTextFilter(term) : []),
        ...(availability ? this.getAvailabilityFilter(availability) : []),
        ...(minRate ? this.getMinRateFilter(minRate) : []),
        ...(specialties ? this.getSpecialtiesFilter(specialties) : []),
      ])
      .toArray();

    return results;
  }

  private getTextFilter(term: string) {
    return [
      { $match: { $text: { $search: term } } },
      { $addFields: { score: { $meta: 'textScore' } } },
      { $sort: { score: { $meta: 'textScore' } } },
    ];
  }

  private getAvailabilityFilter(availability: Date) {
    const dayOfWeek = format(availability, 'EEEE').toLowerCase();
    return [
      // Primero filtramos los doctores que tengan disponibilidad en la fecha solicitada
      {
        $match: {
          'schedule.days': {
            $elemMatch: {
              day: dayOfWeek,
              hours: { $ne: [] },
            },
          },
        },
      },
      // Luego filtramos los doctores que tengan cupo disponible en la fecha solicitada
      // Para esto, primero filtramos las citas del día solicitado
      {
        $project: {
          appointments: {
            $filter: {
              input: '$appointments',
              as: 'appointment',
              cond: {
                $expr: {
                  $eq: [
                    format(availability, 'YYYY-MM-DD'),
                    { $dateToString: { date: '$appointments.startDate', format: '%Y-%m-%d' } },
                  ],
                },
              },
            },
          },
        },
      },
      // Luego filtramos los doctores que tengan cupo disponible en la fecha solicitada
      { $match: { $expr: { $gte: ['$schedule.maxAppointmentsPerDay', { $size: '$$appointments' }] } } },
    ];
  }

  private getMinRateFilter(minRate: number) {
    return [{ $match: { score: { $gt: minRate } } }];
  }

  private getSpecialtiesFilter(specialties: string[]) {
    return [{ $match: { specialty: { $in: specialties } } }];
  }
}
