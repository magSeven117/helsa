import { HttpNextResponse } from '@helsa/controller/http-next-response';
import { routeHandler } from '@helsa/controller/route-handler';
import { database } from '@helsa/database';
import { GetPathologies } from '@helsa/engine/diagnostic/application/get-pathologies';
import { PrismaDiagnosisRepository } from '@helsa/engine/diagnostic/infrastructure/prisma-diagnosis-repository';
import { unstable_cache as cache } from 'next/cache';

export const GET = routeHandler({ name: 'get-pathologies' }, async ({ user }) => {
  const service = new GetPathologies(new PrismaDiagnosisRepository(database));
  const pathologies = await cache(() => service.run(), ['get-pathologies', user.id], {
    tags: [`get-pathologies-${user.id}`],
    revalidate: 3600,
  })();
  return HttpNextResponse.json({ data: pathologies });
});
