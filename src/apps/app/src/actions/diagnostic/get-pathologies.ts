'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetPathologies } from '@helsa/engine/diagnostic/application/get-pathologies';
import { PrismaDiagnosisRepository } from '@helsa/engine/diagnostic/infrastructure/prisma-diagnosis-repository';

export const getPathologies = authActionClient.metadata({ actionName: 'get-pathologies' }).action(async () => {
  const service = new GetPathologies(new PrismaDiagnosisRepository(database));
  return await service.run();
});
