'use server';

import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { GetDoctor } from '../../application/services/get-doctor';
import { PrismaDoctorRepository } from '../../infrastructure/persistence/prisma-doctor-repository';

export const getDoctor = async (userId: string) => {
  const service = new GetDoctor(new PrismaDoctorRepository(db));
  const doctor = await service.run(userId);
  if (!doctor) {
    return null;
  }
  return doctor;
};
