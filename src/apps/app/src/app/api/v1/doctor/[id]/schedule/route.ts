import { database } from '@helsa/database';
import { CreateSchedule } from '@helsa/engine/doctor/application/services/create-schedule';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { TriggerEventBus } from '@helsa/tasks';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { withUser } from '../../../withUser';

const schema = z.object({
  days: z.array(
    z.object({
      day: z.string(),
      hours: z.array(z.object({ hour: z.string() })),
    }),
  ),
});

export const POST = withUser(async ({ req, params }) => {
  const parsedInput = schema.parse(await req.json());
  const { id } = params;
  const { days } = parsedInput;
  const service = new CreateSchedule(new PrismaDoctorRepository(database), new TriggerEventBus());
  await service.run(id, days);

  return NextResponse.json({ message: 'Schedule saved successfully' }, { status: 200 });
});
