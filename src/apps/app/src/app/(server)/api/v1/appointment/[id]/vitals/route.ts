import { HttpNextResponse } from '@helsa/api/http-next-response';
import { routeHandler } from '@helsa/api/route-handler';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { SaveTelemetry } from '@helsa/engine/appointment/application/save-telemetry';
import { AppointmentNotFoundError } from '@helsa/engine/appointment/domain/errors/appointment-not-found-error';
import { AppointmentTelemetry } from '@helsa/engine/appointment/domain/telemetry';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { z } from 'zod';

const schema = z.object({
  weight: z.number().optional(),
  temperature: z.number().optional(),
  bloodPressure: z.number().optional(),
  heartRate: z.number().optional(),
  respiratoryRate: z.number().optional(),
  oxygenSaturation: z.number().optional(),
});

export const POST = routeHandler(
  { name: 'save-vital', schema },
  async ({ params, body }) => {
    const { id } = params;

    const service = new SaveTelemetry(new PrismaAppointmentRepository(database));
    await service.run({ ...body, appointmentId: id } as Primitives<AppointmentTelemetry>);
    return HttpNextResponse.ok();
  },
  (error) => {
    switch (true) {
      case error instanceof AppointmentNotFoundError:
        return HttpNextResponse.domainError(error, 404);
      default:
        return HttpNextResponse.internalServerError();
    }
  }
);
