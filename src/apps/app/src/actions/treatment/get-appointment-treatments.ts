'use server';

import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetAppointmentTreatments } from '@helsa/engine/treatment/application/get-appointment-treatments';
import { PrismaTreatmentRepository } from '@helsa/engine/treatment/infrastructure/prisma-treatment-repository';
import { unstable_cache as cache } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  appointmentId: z.string(),
});

export const getAppointmentTreatments = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'get-appointment-treatments',
  })
  .action(async ({ parsedInput, ctx: { user } }) => {
    const service = new GetAppointmentTreatments(new PrismaTreatmentRepository(database));

    return cache(
      () => service.run(parsedInput.appointmentId),
      ['get-appointment-treatments', user.id, parsedInput.appointmentId],
      {
        tags: [`get-appointment-treatments-${user.id}-${parsedInput.appointmentId}`],
        revalidate: 3600,
      }
    )();
  });
