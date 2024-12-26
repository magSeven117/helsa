'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetPatient } from '@helsa/engine/patient/application/services/get-patient';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
import { z } from 'zod';

const schema = z.object({
  userId: z.string(),
});

export const getPatient = authActionClient
  .schema(schema)
  .metadata({ actionName: 'get-patient' })
  .action(async ({ parsedInput: { userId } }) => {
    const service = new GetPatient(new PrismaPatientRepository(database));
    return await service.run(userId);
  });
