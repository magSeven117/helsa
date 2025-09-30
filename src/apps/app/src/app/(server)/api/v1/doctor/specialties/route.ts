import { HttpNextResponse } from '@helsa/api/http-next-response';
import { routeHandler } from '@helsa/api/route-handler';
import { database } from '@helsa/database';
import { GetSpecialties } from '@helsa/engine/doctor/application/services/get-specialties';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { unstable_cache as cache } from 'next/cache';

export const GET = routeHandler({ name: 'get-specialties' }, async ({ user }) => {
  const service = new GetSpecialties(new PrismaDoctorRepository(database));
  const response = await cache(() => service.run(), ['get-specialties', user?.id.value ?? ''], {
    tags: [`get-specialties-${user?.id.value}`],
  })();

  return HttpNextResponse.json({ data: response });
});
