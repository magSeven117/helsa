import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { GetDoctor } from '@helsa/engine/doctor/application/services/get-doctor';
import { UpdateDoctor } from '@helsa/engine/doctor/application/services/update-doctor';
import { Doctor } from '@helsa/engine/doctor/domain/doctor';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { routeHandler } from '../../route-handler';
export const GET = routeHandler(async ({ user, params, searchParams }) => {
  const { id } = params;
  const { self } = searchParams;
  const include = searchParams.include ? JSON.parse(searchParams.include as string) : null;
  const service = new GetDoctor(new PrismaDoctorRepository(database));

  const userId = self ? user.id : id;

  const response = await service.run(userId, self ? undefined : 'id', include);

  return NextResponse.json({
    message: 'Ok',
    data: response,
  });
});

const schema = z.object({
  doctor: z.object({
    licenseMedicalNumber: z.string().optional(),
    experience: z.number().optional(),
    specialtyId: z.string().optional(),
  }),
});

export const PUT = routeHandler(async ({ params, req, searchParams }) => {
  const { id } = params;
  const body = await req.json();
  const { doctor } = schema.parse(body);

  const service = new UpdateDoctor(new PrismaDoctorRepository(database));
  await service.run(id, doctor as unknown as Primitives<Doctor>);

  return NextResponse.json({
    message: 'Ok',
    data: null,
  });
});
