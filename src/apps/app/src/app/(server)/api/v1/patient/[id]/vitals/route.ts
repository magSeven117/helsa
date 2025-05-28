import { database } from '@helsa/database';
import { GetAvgTelemetryService } from '@helsa/engine/patient/application/services/get-avg-telemetry';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
import { NextResponse } from 'next/server';
import { routeHandler } from '../../../route-handler';

export const GET = routeHandler(async ({ user }) => {
  const service = new GetAvgTelemetryService(new PrismaPatientRepository(database));
  const avg = await service.run(user.id);

  return NextResponse.json({ data: avg }, { status: 200 });
});
