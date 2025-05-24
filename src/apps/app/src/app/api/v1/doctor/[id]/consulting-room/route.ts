import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { SetConsultingRoom } from '@helsa/engine/doctor/application/services/set-consulting-room';
import { ConsultingRoomAddress } from '@helsa/engine/doctor/domain/consulting-room-address';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { routeHandler } from '../../../route-handler';

const schema = z.object({
  consultingRoomAddress: z.object({
    city: z.string(),
    address: z.string(),
  }),
});

export const POST = routeHandler(async ({ req, user, params }) => {
  const { consultingRoomAddress } = schema.parse(await req.json());
  const doctorId = params.id;
  const service = new SetConsultingRoom(new PrismaDoctorRepository(database));
  await service.run(doctorId, consultingRoomAddress as unknown as Primitives<ConsultingRoomAddress>);

  return NextResponse.json(
    {
      message: 'Consulting room saved successfully',
    },
    {
      status: 200,
    },
  );
});
