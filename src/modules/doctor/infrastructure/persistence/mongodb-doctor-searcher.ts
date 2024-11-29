import { User } from '@/modules/user/domain/user';
import { format, isValid } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { MongoClient } from 'mongodb';
import { Doctor } from '../../domain/doctor';
import { DoctorSearcher } from '../../domain/doctor-index-store';

export class MongoDBDoctorSearcher implements DoctorSearcher {
  constructor(private client: MongoClient) {}
  get collection() {
    return this.client.db().collection('doctors');
  }
  async index() {
    let response = '';
    const indexes = await this.collection.listSearchIndexes().toArray();
    const textIndexExists = await this.collection.indexExists('text_index');
    const embedded = {
      name: 'vector_index',
      type: 'vectorSearch',
      definition: {
        fields: [
          {
            type: 'vector',
            path: 'embeddings',
            similarity: 'dotProduct',
            numDimensions: 1536,
          },
        ],
      },
    };
    const index = {
      name: 'text',
    };
    if (!indexes.some((i) => i.name === 'vector_index')) {
      response = await this.collection.createSearchIndex(embedded);
    }
    if (!textIndexExists) {
      response = await this.collection.createIndex(index as any, { name: 'doctor_search' });
    }

    return response;
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
    const userPrimitives = user.toPrimitives();
    const doctorPrimitives = doctor.toPrimitives();
    await this.collection.deleteOne({ doctorId: doctorPrimitives.id });
    await this.collection.insertOne({
      doctorId: doctorPrimitives.id,
      userId: userPrimitives.id,
      name: userPrimitives.name,
      email: userPrimitives.email,
      specialty: doctorPrimitives.specialty?.name,
      score: doctorPrimitives.score,
      experience: doctorPrimitives.experience,
      schedule: appointments.map((a) => ({
        date: a.date,
        appointments: a.appointments,
        day: a.day,
        availabilities: a.availabilities,
      })),
      days: doctorPrimitives.schedule?.days,
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
    console.log(minRate);
    const results = await this.collection
      .aggregate([
        ...(term ? this.getTextFilter(term) : []),
        ...(availability && isValid(new Date(availability!)) ? this.getAvailabilityFilter(availability) : []),
        ...(minRate ? this.getMinRateFilter(minRate) : []),
        ...(specialties ? this.getSpecialtiesFilter(specialties) : []),
        ...(experience ? this.getExperienceFilter(experience) : []),
      ])
      .toArray();

    return results;
  }

  private getTextFilter(term: string) {
    return [
      { $match: { $text: { $search: term } } },
      { $addFields: { search_score: { $meta: 'textScore' } } },
      { $sort: { search_score: { $meta: 'textScore' } } },
    ];
  }

  private getAvailabilityFilter(availability: string) {
    return [
      {
        $match: {
          $or: [
            {
              schedule: {
                $elemMatch: {
                  date: formatInTimeZone(availability, 'America/Caracas', 'yyyy-MM-dd'),
                  availabilities: { $gt: 0 },
                },
              },
            },
            {
              days: {
                $elemMatch: {
                  day: format(availability, 'EEEE').toLowerCase(),
                  hours: { $gt: 0 },
                },
              },
            },
          ],
        },
      },
    ];
  }

  private getMinRateFilter(minRate: number) {
    return [{ $match: { score: { $gt: minRate } } }];
  }

  private getSpecialtiesFilter(specialties: string[]) {
    return [{ $match: { specialty: { $in: specialties } } }];
  }

  private getExperienceFilter(experience: number) {
    return [{ $match: { experience: { $gt: experience } } }];
  }
}
