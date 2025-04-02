'use server';
import { GetAppointment } from '@helsa/engine/appointment/application/get-appointment';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { z } from 'zod';
import { createContext, protectedProcedure } from '../../server';

const schema = z.object({
  appointmentId: z.string().optional(),
  include: z.any().optional(),
});

export const getAppointment = protectedProcedure
  .meta({ name: 'get-appointment' })
  .input(schema)
  .handler(async ({ input, context: { database } }) => {
    const { appointmentId, include } = input;
    if (!appointmentId) {
      return null;
    }
    const service = new GetAppointment(new PrismaAppointmentRepository(database!));
    return await service.run(appointmentId, include);
  })
  .actionable({
    context: async () => {
      return createContext();
    },
  });
