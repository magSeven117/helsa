import { routeHandler } from '@helsa/api/route-handler';
import { database } from '@helsa/database';
import { GetAvgTelemetryService } from '@helsa/engine/patient/application/services/get-avg-telemetry';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
import { NextResponse } from 'next/server';

export const GET = routeHandler({ name: 'get-avg-telemetry' }, async ({ user }) => {
  const service = new GetAvgTelemetryService(new PrismaPatientRepository(database));
  const avg = await service.run(user.id.value ?? '');

  return NextResponse.json({ data: avg }, { status: 200 });
});
