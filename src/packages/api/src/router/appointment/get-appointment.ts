import { Primitives } from '@helsa/ddd/types/primitives';
import { GetAppointment } from '@helsa/engine/appointment/application/get-appointment';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { z } from 'zod';
import { protectedProcedure } from '../../server-client';
const schema = z.object({
  appointmentId: z.string().optional(),
  include: z.any().optional(),
});
export const getAppointment = protectedProcedure
  .input(schema)
  .meta({ name: 'get-appointment' })
  .query(async ({ input, ctx: { database } }): Promise<Primitives<Appointment> | null> => {
    const { appointmentId, include } = input;
    if (!appointmentId) {
      return null;
    }
    const service = new GetAppointment(new PrismaAppointmentRepository(database));
    return await service.run(appointmentId, include);
  });
