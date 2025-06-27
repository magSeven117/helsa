import { HttpNextResponse } from '@helsa/controller/http-next-response';
import { routeHandler } from '@helsa/controller/route-handler';
import { database } from '@helsa/database';
import { FinalizeAppointment } from '@helsa/engine/appointment/application/finalize-appointment';
import { GetAppointment } from '@helsa/engine/appointment/application/get-appointment';
import { AppointmentNotFoundError } from '@helsa/engine/appointment/domain/errors/appointment-not-found-error';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { client } from '@helsa/video';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const GET = routeHandler(
  { name: 'get-appointment', querySchema: z.object({ include: z.string().optional() }) },
  async ({ req, params, searchParams }) => {
    const { id } = params;

    const include = searchParams.include ? JSON.parse(searchParams.include) : null;

    const service = new GetAppointment(new PrismaAppointmentRepository(database));
    const data = await service.run(id, include);

    return HttpNextResponse.json({ data });
  },
  (error) => {
    switch (true) {
      case error instanceof AppointmentNotFoundError:
        return HttpNextResponse.domainError(error, 404);
      default:
        return HttpNextResponse.internalServerError();
    }
  },
);

export const PUT = routeHandler(
  { name: 'finalize-appointment' },
  async ({ params }) => {
    const { id } = params;
    const service = new FinalizeAppointment(new PrismaAppointmentRepository(database));
    await service.run(id);
    const call = client.video.call('appointment', id);
    await call.end();
    revalidatePath('/appointments');
    return HttpNextResponse.ok();
  },
  (error) => {
    switch (true) {
      case error instanceof AppointmentNotFoundError:
        return HttpNextResponse.domainError(error, 404);
      default:
        return HttpNextResponse.internalServerError();
    }
  },
);
