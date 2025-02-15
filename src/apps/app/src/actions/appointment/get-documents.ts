'use server';

import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetDocuments } from '@helsa/engine/appointment/application/get-documents';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { unstable_cache as cache } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  appointmentId: z.string(),
});

export const getDocuments = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'get-documents',
  })
  .action(async ({ parsedInput, ctx: { user } }) => {
    const { appointmentId } = parsedInput;

    const service = new GetDocuments(new PrismaAppointmentRepository(database));

    return cache(() => service.run(appointmentId), ['get-documents', appointmentId, user.id], {
      tags: [`get-documents-${user.id}-${appointmentId}`],
      revalidate: 3600,
    })();
  });
