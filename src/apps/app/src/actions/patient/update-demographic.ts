'use server';

import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { UpdateDemographic } from '@helsa/engine/patient/application/services/update-demographic';
import { PatientDemographic } from '@helsa/engine/patient/domain/members/demographic';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
import { z } from 'zod';

const schema = z.object({
  patientId: z.string(),
  demographic: z.object({
    civilStatus: z.string().optional(),
    occupation: z.string().optional(),
    educativeLevel: z.string().optional(),
  }),
});

export const updateDemographic = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'update-demographic',
  })
  .action(async ({ parsedInput: { demographic, patientId } }) => {
    const service = new UpdateDemographic(new PrismaPatientRepository(database));
    await service.run(patientId, demographic as unknown as Primitives<PatientDemographic>);
  });
