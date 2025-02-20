'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetAppointment } from '@helsa/engine/appointment/application/get-appointment';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { z } from 'zod';

const schema = z.object({
  appointmentId: z.string(),
  include: z.any().optional(),
});

export const getAppointment = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'get-appointment',
  })
  .action(async ({ parsedInput: { appointmentId, include } }) => {
    const service = new GetAppointment(new PrismaAppointmentRepository(database));
    return await service.run(appointmentId, include);
  });
