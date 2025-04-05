import { database } from '@helsa/database';
import { GetSpecialties } from '@helsa/engine/doctor/application/services/get-specialties';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { unstable_cache as cache } from 'next/cache';
import { NextResponse } from 'next/server';
import { withUser } from '../../withUser';

export const GET = withUser(async ({ user }) => {
  const service = new GetSpecialties(new PrismaDoctorRepository(database));
  const response = await cache(() => service.run(), ['get-specialties', user.id], {
    tags: [`get-specialties-${user.id}`],
  })();

  return NextResponse.json({
    message: 'Get specialties',
    data: response,
  });
});
