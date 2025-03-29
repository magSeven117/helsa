'use server';

import { env } from '@/env';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { FinalizeAppointment } from '@helsa/engine/appointment/application/finalize-appointment';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { StreamClient } from '@stream-io/node-sdk';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  id: z.string(),
});

export const finalizeAppointment = authActionClient
  .metadata({
    actionName: 'finalize-appointment',
  })
  .schema(schema)
  .action(async ({ parsedInput }) => {
    const service = new FinalizeAppointment(new PrismaAppointmentRepository(database));
    await service.run(parsedInput.id);
    const client = new StreamClient(env.NEXT_PUBLIC_STREAM_CLIENT_KEY, env.NEXT_PUBLIC_STREAM_CLIENT_SECRET);
    const call = client.video.call('appointment', parsedInput.id);
    await call.end();
    revalidatePath('/appointments');
  });
