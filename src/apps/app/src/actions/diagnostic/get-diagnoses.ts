'use server';
import { authActionClient } from '@helsa/actions/index';
import { database } from '@helsa/database';
import { GetDiagnoses } from '@helsa/engine/diagnostic/application/get-diagnoses';
import { PrismaDiagnosisRepository } from '@helsa/engine/diagnostic/infrastructure/prisma-diagnosis-repository';
import { unstable_cache as cache } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  appointmentId: z.string(),
});

export const getDiagnoses = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'get-diagnoses',
  })
  .action(async ({ parsedInput, ctx: { user } }) => {
    const service = new GetDiagnoses(new PrismaDiagnosisRepository(database));
    return cache(() => service.run(parsedInput.appointmentId), ['get-diagnoses', user.id], {
      tags: [`get-diagnoses-${user.id}`],
      revalidate: 3600,
    })();
  });
