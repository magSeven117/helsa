import { database } from '@helsa/database';
import { GetPatient } from '@helsa/engine/patient/application/services/get-patient';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
import { NextResponse } from 'next/server';
import { routeHandler } from '../../route-handler';

export const GET = routeHandler(async ({ params, searchParams }) => {
  const service = new GetPatient(new PrismaPatientRepository(database));
  const response = await service.run(params.id, 'id', JSON.parse(searchParams.include || '{}'));
  return NextResponse.json({ data: response }, { status: 200 });
});
