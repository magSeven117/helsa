'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetHospital } from '@helsa/engine/hospital/application/services/get-hospital';
import { PrismaHospitalRepository } from '@helsa/engine/hospital/infrastructure/prisma-hospital-repository';
import { z } from 'zod';

const schema = z.object({
  userId: z.string(),
});

export const getHospital = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'get-hospital',
  })
  .action(async ({ parsedInput: { userId } }) => {
    const service = new GetHospital(new PrismaHospitalRepository(database));
    return await service.run(userId);
  });
