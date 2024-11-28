'use server';

import { mongodbClient } from '@/modules/shared/infrastructure/persistence/mongodb/mongodb-client';
import { GetDoctors } from '../../application/services/get-doctors';
import { MongoDBDoctorSearcher } from '../../infrastructure/persistence/mongodb-doctor-searcher';

export async function getDoctors(filters: {
  q?: string;
  specialties?: string[];
  availability?: string;
  minRate?: number;
  experience?: number;
}) {
  const searcher = new MongoDBDoctorSearcher(mongodbClient);
  await searcher.index();
  const service = new GetDoctors(new MongoDBDoctorSearcher(mongodbClient));
  return service.run(filters);
}
