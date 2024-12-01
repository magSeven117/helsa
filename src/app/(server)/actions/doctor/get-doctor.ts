'use server';
import { GetDoctor } from '@/modules/doctor/application/services/get-doctor';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
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
    const service = new GetDoctor(new PrismaDoctorRepository(db));
    const doctor = await service.run(userId);
    if (!doctor) {
      return null;
    }
    return doctor;
  });
