import { listeners } from '@/src/app/(server)/handlers/listeners';
import { database } from '@helsa/database';
import { CreateSchedule } from '@helsa/engine/doctor/application/services/create-schedule';
import { GetDoctorSchedule } from '@helsa/engine/doctor/application/services/get-doctor-schedule';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { UpstashEventBus } from '@helsa/upstash/queue';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { routeHandler } from '../../../route-handler';

const schema = z.object({
  days: z.array(
    z.object({
      day: z.string(),
      hours: z.array(z.object({ hour: z.string() })),
    }),
  ),
  duration: z.number().optional(),
  maxAppointment: z.number().optional(),
});

export const POST = routeHandler(async ({ req, params }) => {
  const parsedInput = schema.parse(await req.json());
  const { id } = params;
  const { days, duration, maxAppointment } = parsedInput;
  const service = new CreateSchedule(new PrismaDoctorRepository(database), new UpstashEventBus(listeners));
  await service.run(id, days, duration, maxAppointment);

  return NextResponse.json({ message: 'Schedule saved successfully' }, { status: 200 });
});

export const GET = routeHandler(async ({ params }) => {
  const { id } = params;
  const service = new GetDoctorSchedule(new PrismaDoctorRepository(database));
  const schedule = await service.run(id);
  return NextResponse.json({ message: 'Ok', data: schedule }, { status: 200 });
});
