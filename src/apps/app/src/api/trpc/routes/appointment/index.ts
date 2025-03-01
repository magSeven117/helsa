import { getPatient } from '@/src/actions/patient/get-patient';
import { CreateAppointment } from '@helsa/engine/appointment/application/create-appointment';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { TriggerEventBus } from '@helsa/tasks';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../../trpc';

const appointmentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        date: z.date(),
        motive: z.string(),
        doctorId: z.string(),
        typeId: z.string(),
        priceId: z.string(),
        specialtyId: z.string(),
        symptoms: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input: { date, motive, symptoms, doctorId, typeId, id, specialtyId, priceId } }) => {
      const data = await getPatient({ userId: ctx.user.id });
      const patientId = data?.data?.id;
      if (!patientId) {
        throw new Error('Patient not found');
      }
      const service = new CreateAppointment(new PrismaAppointmentRepository(ctx.database), new TriggerEventBus());
      await service.run(id, date, motive, doctorId, patientId, typeId, specialtyId, priceId, symptoms);
    }),
});

export default appointmentRouter;
