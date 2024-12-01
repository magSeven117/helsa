import { RemoveEducation } from '@/modules/doctor/application/services/remove-education';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { z } from 'zod';

const schema = z.object({
  doctorId: z.string(),
  educationId: z.string(),
});

export const removeEducation = authActionClient
  .schema(schema)
  .metadata({ actionName: 'remove-education' })
  .action(async ({ parsedInput: { doctorId, educationId } }) => {
    const service = new RemoveEducation(new PrismaDoctorRepository(db));
    return await service.run(doctorId, educationId);
  });
