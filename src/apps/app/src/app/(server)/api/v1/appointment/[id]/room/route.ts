import { database } from '@helsa/database';
import { EnterRoom } from '@helsa/engine/appointment/application/enter-room';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { TriggerEventBus } from '@helsa/tasks';
import { client } from '@helsa/video';
import { NextResponse } from 'next/server';
import { routeHandler } from '../../../route-handler';

export const PUT = routeHandler(async ({ params, user }) => {
  const { id } = params;
  const service = new EnterRoom(new PrismaAppointmentRepository(database), new TriggerEventBus());
  await service.run(id, user.role as 'PATIENT' | 'DOCTOR');
  return NextResponse.json({ message: 'Enter Room' }, { status: 200 });
});

export const GET = routeHandler(async ({ params, user }) => {
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
  return NextResponse.json({ token }, { status: 200 });
});
