import { env } from '@/env';
import { database } from '@helsa/database';
import { FinalizeAppointment } from '@helsa/engine/appointment/application/finalize-appointment';
import { GetAppointment } from '@helsa/engine/appointment/application/get-appointment';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { StreamClient } from '@stream-io/node-sdk';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { routeHandler } from '../../route-handler';

export const GET = routeHandler(async ({ req, params }) => {
  const { id } = params;
  const searchParams = req.nextUrl.searchParams;

  const include = searchParams.get('include') ? JSON.parse(searchParams.get('include') as string) : null;

  const service = new GetAppointment(new PrismaAppointmentRepository(database));
  const data = await service.run(id, include);

  return NextResponse.json({ data, message: 'success' });
});

export const PUT = routeHandler(async ({ params }) => {
  const { id } = params;
  const service = new FinalizeAppointment(new PrismaAppointmentRepository(database));
  await service.run(id);
  const client = new StreamClient(env.NEXT_PUBLIC_STREAM_CLIENT_KEY, env.NEXT_PUBLIC_STREAM_CLIENT_SECRET);
  const call = client.video.call('appointment', id);
  await call.end();
  revalidatePath('/appointments');
  return NextResponse.json({ message: 'Appointment finalized successfully' });
});
