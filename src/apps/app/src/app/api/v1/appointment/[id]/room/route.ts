import { database } from '@helsa/database';
import { EnterRoom } from '@helsa/engine/appointment/application/enter-room';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { TriggerEventBus } from '@helsa/tasks';
import { NextResponse } from 'next/server';
import { routeHandler } from '../../../route-handler';

export const PUT = routeHandler(async ({ params, user }) => {
  const { id } = params;
  const service = new EnterRoom(new PrismaAppointmentRepository(database), new TriggerEventBus());
  await service.run(id, user.role as 'PATIENT' | 'DOCTOR');
  return NextResponse.json({ message: 'Enter Room' }, { status: 200 });
});
