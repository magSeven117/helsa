import { database } from '@helsa/database';
import { SetReadyAppointments } from '@helsa/engine/appointment/application/set-ready-appointments';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const service = new SetReadyAppointments(new PrismaAppointmentRepository(database));
  await service.run();
  return NextResponse.json({ message: 'ok' });
};
