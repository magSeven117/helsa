'use server';
import { CreateAppointment } from '@/modules/appointment/application/create-appointment';
import { PrismaAppointmentRepository } from '@/modules/appointment/infrastructure/persistence/prisma-appointment-repository';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { TriggerEventBus } from '@/modules/shared/infrastructure/events/trigger/trigger-event-bus';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { z } from 'zod';
import { getPatient } from '../patient/get-patient';

const schema = z.object({
  id: z.string(),
  date: z.date(),
  symptoms: z.string(),
  doctorId: z.string(),
  typeId: z.string(),
  specialtyId: z.string(),
});

export const createAppointment = authActionClient
  .schema(schema)
  .metadata({ actionName: 'create-appointment' })
  .action(async ({ parsedInput: { date, symptoms, doctorId, typeId, id, specialtyId }, ctx }) => {
    const data = await getPatient({ userId: ctx.user.id });
    const patientId = data?.data?.id;
    if (!patientId) {
      throw new Error('Patient not found');
    }
    const service = new CreateAppointment(new PrismaAppointmentRepository(db), new TriggerEventBus());
    return service.run(id, date, symptoms, doctorId, patientId, typeId, specialtyId);
  });
