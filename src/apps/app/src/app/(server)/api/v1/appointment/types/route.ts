import { routeHandler } from '@helsa/api/route-handler';
import { database } from '@helsa/database';
import { GetAppointmentTypes } from '@helsa/engine/appointment/application/get-appointment-types';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { NextResponse } from 'next/server';

export const GET = routeHandler({ name: 'get-appointment-types' }, async ({}) => {
  const service = new GetAppointmentTypes(new PrismaAppointmentRepository(database));

  const response = await service.run();

  return NextResponse.json({ data: response, message: 'success' });
});
