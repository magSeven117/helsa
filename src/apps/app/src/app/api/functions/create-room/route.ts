import { database } from '@helsa/database';
import { CreateAppointmentCallRoom } from '@helsa/engine/appointment/application/create-appointment-call-room';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { StreamCallService } from '@helsa/engine/appointment/infrastructure/stream-call-service';
import { env } from '@helsa/env';
import { StreamClient } from '@stream-io/node-sdk';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const payload = await req.json();
  const client = new StreamClient(env.NEXT_PUBLIC_STREAM_CLIENT_KEY, env.NEXT_PUBLIC_STREAM_CLIENT_SECRET);
  const service = new CreateAppointmentCallRoom(
    new PrismaAppointmentRepository(database),
    new StreamCallService(client),
  );

  await service.run(payload.appointmentId);

  return NextResponse.json({ success: true });
};
