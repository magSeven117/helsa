'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { GetDoctors } from '@helsa/engine/doctor/application/services/get-doctors';
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
    const service = new GetDoctors(new PrismaDoctorRepository(database));
    return service.run(parsedInput);
  });
