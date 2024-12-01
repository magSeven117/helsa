import { CreateSchedule } from '@/modules/doctor/application/services/create-schedule';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { TriggerEventBus } from '@/modules/shared/infrastructure/events/trigger/trigger-event-bus';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { z } from 'zod';

const schema = z.object({
  doctorId: z.string(),
  days: z.array(
    z.object({
      day: z.string(),
      hours: z.array(z.object({ hour: z.string() })),
    })
  ),
});
export const saveSchedule = authActionClient
  .schema(schema)
  .metadata({ actionName: 'save-schedule' })
  .action(async ({ parsedInput }) => {
    const service = new CreateSchedule(new PrismaDoctorRepository(db), new TriggerEventBus());
    const { doctorId, days } = parsedInput;
    await service.run(doctorId, days);
  });
