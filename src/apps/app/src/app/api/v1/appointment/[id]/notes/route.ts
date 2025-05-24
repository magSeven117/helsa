import { database } from '@helsa/database';
import { CreateAppointmentNote } from '@helsa/engine/appointment/application/create-appointment-note';
import { GetNotes } from '@helsa/engine/appointment/application/get-notes';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { routeHandler } from '../../../route-handler';

export const GET = routeHandler(async ({ user, params }) => {
  const { id } = params;
  const service = new GetNotes(new PrismaAppointmentRepository(database));
  const response = await service.run(id);

  return NextResponse.json({ data: response, message: 'success' });
});

const createNote = z.object({
  note: z.string(),
  id: z.string(),
  isPublic: z.boolean(),
});

export const POST = routeHandler(async ({ user, params, req }) => {
  const { id: appointmentId } = params;
  const body = await req.json();
  const { note, id, isPublic } = createNote.parse(body);

  const service = new CreateAppointmentNote(new PrismaAppointmentRepository(database));

  await service.run(appointmentId, id, note, isPublic);

  revalidatePath(`/appointments`);
  revalidateTag(`get-notes-${user.id}-${id}`);

  return NextResponse.json({ message: 'success' }, { status: 201 });
});
