import { GetPatient } from '@/modules/patient/application/services/get-patient';
import { PrismaPatientRepository } from '@/modules/patient/infrastructure/prisma-patient-repository';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { z } from 'zod';

const schema = z.object({
  userId: z.string(),
});

export const getPatient = authActionClient
  .schema(schema)
  .metadata({ actionName: 'get-patient' })
  .action(async ({ parsedInput: { userId } }) => {
    const service = new GetPatient(new PrismaPatientRepository(db));
    return await service.run(userId);
  });
