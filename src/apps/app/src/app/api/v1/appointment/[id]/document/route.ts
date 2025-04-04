import { database } from '@helsa/database';
import { GetDocuments } from '@helsa/engine/appointment/application/get-documents';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { unstable_cache as cache } from 'next/cache';
import { withUser } from '../../../withUser';
import { NextResponse } from 'next/server';

export const GET = withUser(async ({ user, params }) => {
  const { id } = params;
  const service = new GetDocuments(new PrismaAppointmentRepository(database));

  const response = cache(() => service.run(id), ['get-documents', id, user.id], {
    tags: [`get-documents-${user.id}-${id}`],
    revalidate: 3600,
  })();

  return NextResponse.json({ data: response, message: 'success' });
});
