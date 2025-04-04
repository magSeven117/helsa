import { database } from '@helsa/database';
import { GetAppointmentTypes } from '@helsa/engine/appointment/application/get-appointment-types';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { unstable_cache as cache } from 'next/cache';
import { NextResponse } from 'next/server';
import { withUser } from '../../withUser';

export const GET = withUser(async ({ req, user, params, searchParams }) => {
  const service = new GetAppointmentTypes(new PrismaAppointmentRepository(database));

  const response = cache(() => service.run(), ['get-appointment-types', user.id], {
    tags: [`get-appointment-types-${user.id}`],
    revalidate: 3600,
  })();

  return NextResponse.json({ data: response, message: 'success' });
});
