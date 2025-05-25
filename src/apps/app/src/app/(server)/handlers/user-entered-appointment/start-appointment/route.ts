import { database } from '@helsa/database';
import { StartAppointment } from '@helsa/engine/appointment/application/start-appointment';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { verifySignatureAppRouter } from '@upstash/qstash/dist/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export const POST = verifySignatureAppRouter(async (req: NextRequest) => {
  const { data } = await req.json();
  const service = new StartAppointment(new PrismaAppointmentRepository(database));
  await service.run(data.appointmentId);
  return NextResponse.json({ message: 'Ok' });
});
