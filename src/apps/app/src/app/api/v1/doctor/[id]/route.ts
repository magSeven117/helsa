import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { GetDoctor } from '@helsa/engine/doctor/application/services/get-doctor';
import { UpdateDoctor } from '@helsa/engine/doctor/application/services/update-doctor';
import { Doctor } from '@helsa/engine/doctor/domain/doctor';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { unstable_cache as cache } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { withUser } from '../../withUser';
export const GET = withUser(async ({ user, params, searchParams }) => {
  const { id } = params;
  const { self } = searchParams;

  const service = new GetDoctor(new PrismaDoctorRepository(database));

  const userId = self ? user.id : id;

  const response = await cache(() => service.run(userId, self ? undefined : 'id'), ['doctor', id, user.id], {
    tags: [`doctor-${id}-${user.id}`],
    revalidate: 60 * 60,
  })();

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

export const PUT = withUser(async ({ user, params, req }) => {
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
