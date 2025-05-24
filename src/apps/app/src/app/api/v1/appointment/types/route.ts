import { database } from '@helsa/database';
import { GetAppointmentTypes } from '@helsa/engine/appointment/application/get-appointment-types';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { NextResponse } from 'next/server';
import { routeHandler } from '../../route-handler';

export const GET = routeHandler(async ({ user }) => {
  const service = new GetAppointmentTypes(new PrismaAppointmentRepository(database));

  const response = await service.run();

  return NextResponse.json({ data: response, message: 'success' });
});
