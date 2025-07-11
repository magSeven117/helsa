import { HttpNextResponse } from '@helsa/api/http-next-response';
import { routeHandler } from '@helsa/api/route-handler';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { SetConsultingRoom } from '@helsa/engine/doctor/application/services/set-consulting-room';
import { ConsultingRoomAddress } from '@helsa/engine/doctor/domain/consulting-room-address';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { z } from 'zod';

const schema = z.object({
  consultingRoomAddress: z.object({
    city: z.string(),
    address: z.string(),
  }),
});

export const POST = routeHandler({ name: 'set-consulting-room', schema }, async ({ body, user, params }) => {
  const { consultingRoomAddress } = body;
  const doctorId = params.id;
  const service = new SetConsultingRoom(new PrismaDoctorRepository(database));
  await service.run(doctorId, consultingRoomAddress as unknown as Primitives<ConsultingRoomAddress>);

  return HttpNextResponse.created();
});
