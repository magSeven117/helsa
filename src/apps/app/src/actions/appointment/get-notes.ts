'use server';

import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetNotes } from '@helsa/engine/appointment/application/get-notes';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { unstable_cache as cache } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  appointmentId: z.string(),
});

export const getNotes = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'get-notes',
  })
  .action(async ({ parsedInput, ctx: { user } }) => {
    const { appointmentId } = parsedInput;

    const service = new GetNotes(new PrismaAppointmentRepository(database));

    return cache(() => service.run(appointmentId), ['get-notes', appointmentId, user.id], {
      tags: [`get-notes-${user.id}-${appointmentId}`],
      revalidate: 3600,
    })();
  });
