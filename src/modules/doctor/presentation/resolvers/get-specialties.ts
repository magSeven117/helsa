import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { GetSpecialties } from '../../application/services/get-specialties';
import { PrismaDoctorRepository } from '../../infrastructure/persistence/prisma-doctor-repository';

export const GetSpecialtiesResolver = async (ctx, input) => {
  try {
    const service = new GetSpecialties(new PrismaDoctorRepository(db));
    const specialties = await service.run();
    return specialties.map((specialty) => specialty.toPrimitives());
  } catch (error) {
    console.log('Error', error);
    throw new InternalError(error.message);
  }
};
