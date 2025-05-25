import { database } from '@helsa/database';
import { GetDocuments } from '@helsa/engine/appointment/application/get-documents';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { unstable_cache as cache } from 'next/cache';
import { NextResponse } from 'next/server';
import { routeHandler } from '../../../route-handler';

export const GET = routeHandler(async ({ user, params }) => {
  const { id } = params;
  const service = new GetDocuments(new PrismaAppointmentRepository(database));

  const response = cache(() => service.run(id), ['get-documents', id, user.id], {
    tags: [`get-documents-${user.id}-${id}`],
    revalidate: 3600,
  })();

  return NextResponse.json({ data: response, message: 'success' });
});
