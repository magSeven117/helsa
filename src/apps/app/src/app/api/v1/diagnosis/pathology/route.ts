import { database } from '@helsa/database';
import { GetPathologies } from '@helsa/engine/diagnostic/application/get-pathologies';
import { PrismaDiagnosisRepository } from '@helsa/engine/diagnostic/infrastructure/prisma-diagnosis-repository';
import { unstable_cache as cache } from 'next/cache';
import { NextResponse } from 'next/server';
import { withUser } from '../../withUser';

export const GET = withUser(async ({ user }) => {
  const service = new GetPathologies(new PrismaDiagnosisRepository(database));
  const pathologies = await cache(() => service.run(), ['get-pathologies', user.id], {
    tags: [`get-pathologies-${user.id}`],
    revalidate: 3600,
  })();
  return NextResponse.json({ data: pathologies }, { status: 200 });
});
