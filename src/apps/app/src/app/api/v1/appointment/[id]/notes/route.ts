import { database } from '@helsa/database';
import { CreateAppointmentNote } from '@helsa/engine/appointment/application/create-appointment-note';
import { GetDocuments } from '@helsa/engine/appointment/application/get-documents';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { unstable_cache as cache } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { withUser } from '../../../withUser';

export const GET = withUser(async ({ user, params }) => {
  const { id } = params;
  const service = new GetDocuments(new PrismaAppointmentRepository(database));
  const response = cache(() => service.run(id), ['get-notes', id, user.id], {
    tags: [`get-notes-${user.id}-${id}`],
    revalidate: 3600,
  })();

  return NextResponse.json({ data: response, message: 'success' });
});

const createNote = z.object({
  note: z.string(),
});

export const POST = withUser(async ({ user, params, req }) => {
  const { id } = params;
  const body = await req.json();
  const { note } = createNote.parse(body);

  const service = new CreateAppointmentNote(new PrismaAppointmentRepository(database));

  await service.run(id, note);

  return NextResponse.json({ message: 'success' }, { status: 201 });
});
