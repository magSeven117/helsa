import { database } from '@helsa/database';
import { SetReadyAppointments } from '@helsa/engine/appointment/application/set-ready-appointments';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { verifySignatureAppRouter } from '@upstash/qstash/dist/nextjs';
import { NextRequest, NextResponse } from 'next/server';

/**
 * This is a cron job that runs every 30 minutes to set appointments to ready.
 * It is triggered by a webhook from Upstash Qstash.
 * The webhook is verified using the verifySignatureAppRouter middleware.
 *
 * Cron expression: '* / 30 * * * *'
 * Body: {}
 */
export const POST = verifySignatureAppRouter(async (req: NextRequest) => {
  const service = new SetReadyAppointments(new PrismaAppointmentRepository(database));
  await service.run();
  return NextResponse.json({
    message: 'Ok',
  });
});
