'use server';
import { GetAppointment } from '@/modules/appointment/application/get-appointment';
import { PrismaAppointmentRepository } from '@/modules/appointment/infrastructure/persistence/prisma-appointment-repository';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { z } from 'zod';

const schema = z.object({
  appointmentId: z.string(),
});

export const getAppointment = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'get-appointment',
  })
  .action(async ({ parsedInput: { appointmentId } }) => {
    const service = new GetAppointment(new PrismaAppointmentRepository(db));
    return await service.run(appointmentId);
  });
