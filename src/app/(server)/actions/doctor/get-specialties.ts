'use server';
import { GetSpecialties } from '@/modules/doctor/application/services/get-specialties';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { actionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';

export const getSpecialties = actionClient
  .metadata({
    actionName: 'get-specialties',
  })
  .action(async (_) => {
    const service = new GetSpecialties(new PrismaDoctorRepository(db));
    const specialties = await service.run();
    return specialties.map((specialty) => specialty.toPrimitives());
  });
