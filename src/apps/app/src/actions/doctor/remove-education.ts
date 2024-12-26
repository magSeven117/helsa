'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { RemoveEducation } from '@helsa/engine/doctor/application/services/remove-education';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { z } from 'zod';

const schema = z.object({
  doctorId: z.string(),
  educationId: z.string(),
});

export const removeEducation = authActionClient
  .schema(schema)
  .metadata({ actionName: 'remove-education' })
  .action(async ({ parsedInput: { doctorId, educationId } }) => {
    const service = new RemoveEducation(new PrismaDoctorRepository(database));
    return await service.run(doctorId, educationId);
  });
