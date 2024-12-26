'use server';

import { actionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetSpecialties } from '@helsa/engine/doctor/application/services/get-specialties';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';

export const getSpecialties = actionClient
  .metadata({
    actionName: 'get-specialties',
  })
  .action(async (_) => {
    const service = new GetSpecialties(new PrismaDoctorRepository(database));
    const specialties = await service.run();
    return specialties.map((specialty) => specialty.toPrimitives());
  });
