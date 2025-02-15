'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetPathologies } from '@helsa/engine/diagnostic/application/get-pathologies';
import { PrismaDiagnosisRepository } from '@helsa/engine/diagnostic/infrastructure/prisma-diagnosis-repository';
import { unstable_cache as cache } from 'next/cache';

export const getPathologies = authActionClient
  .metadata({ actionName: 'get-pathologies' })
  .action(async ({ ctx: { user } }) => {
    const service = new GetPathologies(new PrismaDiagnosisRepository(database));
    return cache(() => service.run(), ['get-pathologies', user.id], {
      tags: [`get-pathologies-${user.id}`],
      revalidate: 3600,
    })();
  });
