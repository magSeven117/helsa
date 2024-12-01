import { UpdateDemographic } from '@/modules/patient/application/services/update-demographic';
import { PrismaPatientRepository } from '@/modules/patient/infrastructure/prisma-patient-repository';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { z } from 'zod';

const schema = z.object({
  patientId: z.string(),
  demographic: z.object({
    civilStatus: z.string(),
    occupation: z.string(),
    educativeLevel: z.string(),
  }),
});

export const updateDemographic = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'update-demographic',
  })
  .action(async ({ parsedInput: { demographic, patientId } }) => {
    const service = new UpdateDemographic(new PrismaPatientRepository(db));
    await service.run(patientId, demographic);
  });
