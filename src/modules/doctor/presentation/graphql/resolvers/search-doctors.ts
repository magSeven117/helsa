import { SearchDoctors } from '@/modules/doctor/application/services/search-doctors';
import { MongoDBDoctorIndexStore } from '@/modules/doctor/infrastructure/persistence/mongodb-doctor-index-store';
import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { mongodbClient } from '@/modules/shared/infrastructure/persistence/mongodb/mongodb-client';

export const SearchDoctorsResolver = async (_, input) => {
  try {
    const { term, availability, minRate, specialties } = input;
    const service = new SearchDoctors(new MongoDBDoctorIndexStore(mongodbClient));
    return await service.run({ term, availability, minRate, specialties });
  } catch (error) {
    console.log('[ERROR searching doctor]', error);
    throw new InternalError('Internal error');
  }
};
