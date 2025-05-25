import { database } from '@helsa/database';
import { CreateAppointmentCallRoom } from '@helsa/engine/appointment/application/create-appointment-call-room';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { StreamCallService } from '@helsa/engine/appointment/infrastructure/stream-call-service';
import { client } from '@helsa/video';
import { verifySignatureAppRouter } from '@upstash/qstash/dist/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export const POST = verifySignatureAppRouter(async (req: NextRequest) => {
  const { data } = await req.json();
  const service = new CreateAppointmentCallRoom(
    new PrismaAppointmentRepository(database),
    new StreamCallService(client),
  );

  await service.run(data.id);
  return NextResponse.json({
    message: 'Ok',
  });
});
