import { HttpNextResponse } from '@helsa/api/http-next-response';
import { routeHandler } from '@helsa/api/route-handler';
import { database } from '@helsa/database';
import { CreateAppointmentNote } from '@helsa/engine/appointment/application/create-appointment-note';
import { GetNotes } from '@helsa/engine/appointment/application/get-notes';
import { AppointmentNotFoundError } from '@helsa/engine/appointment/domain/errors/appointment-not-found-error';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { z } from 'zod';

export const GET = routeHandler({ name: 'get-appointment-notes' }, async ({ user, params }) => {
  const { id } = params;
  const service = new GetNotes(new PrismaAppointmentRepository(database));
  const response = await service.run(id);

  return HttpNextResponse.json({ data: response });
});

const createNote = z.object({
  note: z.string(),
  id: z.string(),
  isPublic: z.boolean(),
});

export const POST = routeHandler(
  {
    name: 'save-appointment-note',
    schema: createNote,
  },
  async ({ user, params, body }) => {
    const { id: appointmentId } = params;
    const { note, id, isPublic } = body;

    const service = new CreateAppointmentNote(new PrismaAppointmentRepository(database));

    await service.run(appointmentId, id, note, isPublic);
    return HttpNextResponse.created();
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
