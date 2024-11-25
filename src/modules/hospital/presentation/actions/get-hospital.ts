'use server';
import { GetHospital } from '@/modules/hospital/application/services/get-hospital';
import { PrismaHospitalRepository } from '@/modules/hospital/infrastructure/prisma-hospital-repository';
import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';

export async function getHospital(userId: string) {
  try {
    const service = new GetHospital(new PrismaHospitalRepository(db));
    return await service.run(userId);
  } catch (error: any) {
    console.log('[GetHospital', error);
    throw new InternalError(error);
  }
}
