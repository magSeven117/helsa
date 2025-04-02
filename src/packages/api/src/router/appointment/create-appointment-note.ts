import { CreateAppointmentNote } from '@helsa/engine/appointment/application/create-appointment-note';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { protectedProcedure } from '../../server-client';

const schema = z.object({
  appointmentId: z.string(),
  note: z.string(),
});

export const createAppointmentNote = protectedProcedure
  .input(schema)
  .meta({ name: 'create-appointment-note' })
  .mutation(async ({ input, ctx: { database } }) => {
    const service = new CreateAppointmentNote(new PrismaAppointmentRepository(database));
    await service.run(input.appointmentId, input.note);
    revalidatePath(`/appointments/${input.appointmentId}`);
  });
