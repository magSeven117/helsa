'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { CreateAppointment } from '@helsa/engine/appointment/application/create-appointment';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { TriggerEventBus } from '@helsa/tasks';
import { z } from 'zod';
import { getPatient } from '../patient/get-patient';

const schema = z.object({
  id: z.string(),
  date: z.date(),
  symptoms: z.string(),
  doctorId: z.string(),
  typeId: z.string(),
  priceId: z.string(),
  specialtyId: z.string(),
});

export const createAppointment = authActionClient
  .schema(schema)
  .metadata({ actionName: 'create-appointment' })
  .action(async ({ parsedInput: { date, symptoms, doctorId, typeId, id, specialtyId, priceId }, ctx }) => {
    const data = await getPatient({ userId: ctx.user.id });
    const patientId = data?.data?.id;
    if (!patientId) {
      throw new Error('Patient not found');
    }
    const service = new CreateAppointment(new PrismaAppointmentRepository(database), new TriggerEventBus());
    return service.run(id, date, symptoms, doctorId, patientId, typeId, specialtyId, priceId);
  });
