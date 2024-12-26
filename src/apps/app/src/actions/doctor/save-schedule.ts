'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { CreateSchedule } from '@helsa/engine/doctor/application/services/create-schedule';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { TriggerEventBus } from '@helsa/tasks';
import { z } from 'zod';

const schema = z.object({
  doctorId: z.string(),
  days: z.array(
    z.object({
      day: z.string(),
      hours: z.array(z.object({ hour: z.string() })),
    }),
  ),
});
export const saveSchedule = authActionClient
  .schema(schema)
  .metadata({ actionName: 'save-schedule' })
  .action(async ({ parsedInput }) => {
    const service = new CreateSchedule(new PrismaDoctorRepository(database), new TriggerEventBus());
    const { doctorId, days } = parsedInput;
    await service.run(doctorId, days);
  });
