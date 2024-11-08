'use server';

import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { GetPatient } from '../../application/services/get-patient';
import { PrismaPatientRepository } from '../../infrastructure/prisma-patient-repository';

export async function getPatient({ id }) {
  const service = new GetPatient(new PrismaPatientRepository(db));
  return await service.run(id);
}
