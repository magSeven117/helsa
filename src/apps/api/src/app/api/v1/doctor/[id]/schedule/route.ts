import { HttpNextResponse } from '@helsa/controller/http-next-response';
import { routeHandler } from '@helsa/controller/route-handler';
import { database } from '@helsa/database';
import { CreateSchedule } from '@helsa/engine/doctor/application/services/create-schedule';
import { GetDoctorSchedule } from '@helsa/engine/doctor/application/services/get-doctor-schedule';
import { DoctorNotFoundError } from '@helsa/engine/doctor/domain/errors/doctor-not-found-error';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { InngestEventBus } from '@helsa/ingest/event-bus';
import { z } from 'zod';

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

export const POST = routeHandler(
  { name: 'create-schedule', schema },
  async ({ params, body }) => {
    const { id } = params;
    const { days, duration, maxAppointment } = body;
    const service = new CreateSchedule(new PrismaDoctorRepository(database), new InngestEventBus());
    await service.run(id, days, duration, maxAppointment);

    return HttpNextResponse.created();
  },
  (error) => {
    switch (true) {
      case error instanceof DoctorNotFoundError:
        return HttpNextResponse.domainError(error, 404);
      default:
        return HttpNextResponse.internalServerError();
    }
  },
);

export const GET = routeHandler({ name: 'get-doctor-schedule' }, async ({ params }) => {
  const { id } = params;
  const service = new GetDoctorSchedule(new PrismaDoctorRepository(database));
  const schedule = await service.run(id);
  return HttpNextResponse.json({ data: schedule });
});
