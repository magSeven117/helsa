import { HttpNextResponse } from '@helsa/controller/http-next-response';
import { routeHandler } from '@helsa/controller/route-handler';
import { database } from '@helsa/database';
import { EnterRoom } from '@helsa/engine/appointment/application/enter-room';
import { AppointmentNotFoundError } from '@helsa/engine/appointment/domain/errors/appointment-not-found-error';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { InngestEventBus } from '@helsa/ingest/event-bus';
import { client } from '@helsa/video';

export const PUT = routeHandler(
  { name: 'enter-room' },
  async ({ params, user }) => {
    const { id } = params;
    const service = new EnterRoom(new PrismaAppointmentRepository(database), new InngestEventBus());
    await service.run(id, user.role as 'PATIENT' | 'DOCTOR');
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

export const GET = routeHandler({ name: 'get-user-room-token' }, async ({ user }) => {
  await client.upsertUsers([
    {
      id: user.id,
      name: user.name,
      image: user.image ?? '',
      role: user.role === 'PATIENT' ? 'patient' : 'doctor',
    },
  ]);

  const token = client.generateUserToken({
    user_id: user.id,
    validity_in_seconds: 60 * 60 * 24,
  });
  return HttpNextResponse.json({ token });
});
