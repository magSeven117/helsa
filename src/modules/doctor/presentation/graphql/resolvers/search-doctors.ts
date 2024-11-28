import { SearchDoctors } from '@/modules/doctor/application/services/search-doctors';
import { MongoDBDoctorSearcher } from '@/modules/doctor/infrastructure/persistence/mongodb-doctor-searcher';
import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { mongodbClient } from '@/modules/shared/infrastructure/persistence/mongodb/mongodb-client';

export const SearchDoctorsResolver = async (
  _: unknown,
  input: {
    term?: string;
    availability?: Date;
    minRate?: number;
    specialties?: string[];
  }
) => {
  try {
    const { term, availability, minRate, specialties } = input;
    const service = new SearchDoctors(new MongoDBDoctorSearcher(mongodbClient));
    return await service.run({ term, availability, minRate, specialties });
  } catch (error) {
    console.log('[ERROR searching doctor]', error);
    throw new InternalError('Internal error');
  }
};
