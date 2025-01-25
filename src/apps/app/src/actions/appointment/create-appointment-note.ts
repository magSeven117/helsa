'use server';

import { authActionClient } from '@helsa/actions';
import { z } from 'zod';
import { CreateAppointmentNote } from '@helsa/engine/appointment/application/create-appointment-note';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { database } from '@helsa/database';
import { revalidatePath } from 'next/cache';

const schema = z.object({
  appointmentId: z.string(),
  note: z.string(),
});
export const createAppointmentNote = authActionClient
  .schema(schema)
  .metadata({ actionName: 'create-appointment-note' })
  .action(async ({ parsedInput: { appointmentId, note }, ctx }) => {
    const service = new CreateAppointmentNote(new PrismaAppointmentRepository(database));
    await service.run(appointmentId, note);
    revalidatePath(`/appointments/${appointmentId}`);
  });
