'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetDoctor } from '@helsa/engine/doctor/application/services/get-doctor';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { z } from 'zod';

const schema = z.object({
  userId: z.string(),
});

export const getDoctor = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'get-doctor',
  })
  .action(async ({ parsedInput: { userId } }) => {
    const service = new GetDoctor(new PrismaDoctorRepository(database));
    const doctor = await service.run(userId);
    if (!doctor) {
      return null;
    }
    return doctor;
  });
