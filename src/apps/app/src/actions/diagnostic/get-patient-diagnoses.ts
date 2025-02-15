'use server';
import { authActionClient } from '@helsa/actions/index';
import { database } from '@helsa/database';
import { Operator } from '@helsa/ddd/core/criteria';
import { GetDiagnoses } from '@helsa/engine/diagnostic/application/get-diagnoses';
import { PrismaDiagnosisRepository } from '@helsa/engine/diagnostic/infrastructure/prisma-diagnosis-repository';
import { unstable_cache as cache } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  patientId: z.string(),
});

export const getPatientDiagnoses = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'get-patient-diagnoses',
  })
  .action(async ({ parsedInput, ctx: { user } }) => {
    const service = new GetDiagnoses(new PrismaDiagnosisRepository(database));
    return cache(
      () => service.run([{ field: 'patientId', operator: Operator.EQUAL, value: parsedInput.patientId }]),
      ['get=patient-diagnoses', user.id, parsedInput.patientId],
      {
        tags: [`get-patient-diagnoses-${parsedInput.patientId}`],
        revalidate: 3600,
      }
    )();
  });
