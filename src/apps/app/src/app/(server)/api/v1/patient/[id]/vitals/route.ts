import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { GetAvgTelemetryService } from '@helsa/engine/patient/application/services/get-avg-telemetry';
import { UpdateBiometric } from '@helsa/engine/patient/application/services/update-biometric';
import { PatientBiometric } from '@helsa/engine/patient/domain/members/biometric';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { routeHandler } from '../../../route-handler';

export const GET = routeHandler(async ({ user }) => {
  const service = new GetAvgTelemetryService(new PrismaPatientRepository(database));
  const avg = await service.run(user.id);

  return NextResponse.json({ data: avg }, { status: 200 });
});

const schema = z.object({
  biometric: z.object({
    height: z.number().optional(),
    organDonor: z.string().optional(),
    bloodType: z.string().optional(),
  }),
});

export const PUT = routeHandler(async ({ user, req, params }) => {
  const parsedInput = schema.parse(await req.json());
  const { biometric } = parsedInput;
  const { id } = params;
  const service = new UpdateBiometric(new PrismaPatientRepository(database));
  await service.run(id, biometric as Primitives<PatientBiometric>);
});
