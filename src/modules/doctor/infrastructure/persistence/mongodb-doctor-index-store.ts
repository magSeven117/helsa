import { User } from '@/modules/user/domain/user';
import { format } from 'date-fns';
import { MongoClient } from 'mongodb';
import { Doctor } from '../../domain/doctor';

export class MongoDBDoctorRepository {
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
    availability?: { startDate: Date; endDate: Date };
    minRate?: number;
    specialties?: string[];
  }) {
    let filters = {};

    if (term) filters = { $text: term };
    if (availability) filters = { ...filters, appointments: { initDate: format(new Date(), 'YYYY-MM-DD') } };
    if (minRate) filters = { ...filters, score: { $gt: minRate } };
    if (specialties) filters = { ...filters, specialty: { $in: specialties } };
    const results = await this.collection
      .aggregate([
        { $match: { $text: '' } },
        { $limit: 50 },
        { $addFields: { score: { $meta: 'textScore' } } },
        { $sort: { score: { $meta: 'textScore' } } },
      ])
      .toArray();

    if (availability) {
      return results.filter(
        (doctor) =>
          doctor.appointments.filter((appointment) => appointment.initDate === format(new Date(), 'YYYY-MM-DD'))
            .length < doctor.schedule.maxAppointmentsPerDay
      );
    }

    return results;
  }
}
