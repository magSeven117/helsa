import { GetDoctors } from '@/modules/doctor/application/services/get-doctors';
import { MongoDBDoctorSearcher } from '@/modules/doctor/infrastructure/persistence/mongodb-doctor-searcher';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { mongodbClient } from '@/modules/shared/infrastructure/persistence/mongodb/mongodb-client';
import { z } from 'zod';

const schema = z.object({
  q: z.string().optional(),
  specialties: z.array(z.string()).optional(),
  availability: z.string().optional(),
  minRate: z.number().optional(),
  experience: z.number().optional(),
});

export const searchDoctors = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'search-doctors',
  })
  .action(async ({ parsedInput }) => {
    const searcher = new MongoDBDoctorSearcher(mongodbClient);
    await searcher.index();
    const service = new GetDoctors(new MongoDBDoctorSearcher(mongodbClient));
    return service.run(parsedInput);
  });
