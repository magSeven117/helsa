import { routeHandler } from '@helsa/controller/route-handler';
import { database } from '@helsa/database';
import { GetSymptoms } from '@helsa/engine/appointment/application/get-symptoms';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { NextResponse } from 'next/server';

export const GET = routeHandler({ name: 'get-symptoms' }, async () => {
  const service = new GetSymptoms(new PrismaAppointmentRepository(database));
  const response = await service.run();
  return NextResponse.json({ data: response });
});
