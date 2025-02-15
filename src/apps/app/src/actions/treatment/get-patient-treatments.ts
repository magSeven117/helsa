'use server';

import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { Operator } from '@helsa/ddd/core/criteria';
import { GetTreatments } from '@helsa/engine/treatment/application/get-treatments';
import { PrismaTreatmentRepository } from '@helsa/engine/treatment/infrastructure/prisma-treatment-repository';
import { unstable_cache as cache } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  patientId: z.string(),
});

export const getPatientTreatments = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'get-patient-treatments',
  })
  .action(async ({ parsedInput, ctx: { user } }) => {
    const service = new GetTreatments(new PrismaTreatmentRepository(database));

    return cache(
      () => service.run([{ field: 'patientId', operator: Operator.EQUAL, value: parsedInput.patientId }]),
      ['get-patient-treatments', user.id, parsedInput.patientId],
      {
        tags: [`get-patient-treatments-${user.id}-${parsedInput.patientId}`],
        revalidate: 3600,
      }
    )();
  });
