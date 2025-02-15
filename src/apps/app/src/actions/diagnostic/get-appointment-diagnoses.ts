'use server';
import { authActionClient } from '@helsa/actions/index';
import { database } from '@helsa/database';
import { Operator } from '@helsa/ddd/core/criteria';
import { GetDiagnoses } from '@helsa/engine/diagnostic/application/get-diagnoses';
import { PrismaDiagnosisRepository } from '@helsa/engine/diagnostic/infrastructure/prisma-diagnosis-repository';
import { unstable_cache as cache } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  appointmentId: z.string(),
});

export const getAppointmentDiagnoses = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'get-appointment-diagnoses',
  })
  .action(async ({ parsedInput, ctx: { user } }) => {
    const service = new GetDiagnoses(new PrismaDiagnosisRepository(database));
    return cache(
      () => service.run([{ field: 'appointmentId', operator: Operator.EQUAL, value: parsedInput.appointmentId }]),
      ['get-appointment-diagnoses', user.id, parsedInput.appointmentId],
      {
        tags: [`get-appointment-diagnoses-${parsedInput.appointmentId}`],
        revalidate: 3600,
      }
    )();
  });
