'use server';
import { GetDoctors } from '@/modules/doctor/application/services/get-doctors';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
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
    const service = new GetDoctors(new PrismaDoctorRepository(db));
    return service.run(parsedInput);
  });
