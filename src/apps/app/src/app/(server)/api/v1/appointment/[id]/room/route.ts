import { HttpNextResponse } from '@helsa/api/http-next-response';
import { routeHandler } from '@helsa/api/route-handler';
import { database } from '@helsa/database';
import { EnterRoom } from '@helsa/engine/appointment/application/enter-room';
import { AppointmentNotFoundError } from '@helsa/engine/appointment/domain/errors/appointment-not-found-error';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { InngestEventBus } from '@helsa/events/event-bus';
import { dailyClient } from '@helsa/video';

export const PUT = routeHandler(
  { name: 'enter-room' },
  async ({ params, user }) => {
    const { id } = params;
    const service = new EnterRoom(new PrismaAppointmentRepository(database), new InngestEventBus());
    await service.run(id, user?.role.value as 'PATIENT' | 'DOCTOR');
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

export const GET = routeHandler({ name: 'get-user-room-token' }, async ({ user, params }) => {
  const { id } = params;
  const roomName = `appointment-${id}`;
  
  // Generar token de Daily.co con permisos de transcripción
  const tokenData = await dailyClient.createToken(roomName, user?.id.value ?? '', {
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24 horas
    isOwner: user?.role.value === 'DOCTOR', // Doctor es owner, paciente no
  });

  return HttpNextResponse.json({ 
    token: tokenData.token,
    roomUrl: dailyClient.getRoomUrl(roomName)
  });
});
