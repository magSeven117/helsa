import { InternalError } from '@/modules/shared/domain/core/errors/InternalError';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/PrismaConnection';
import { CreateDoctor } from '../../application/services/create-doctor';
import { PrismaDoctorRepository } from '../../infrastructure/persistence/prisma-doctor-repository';

export const CreateDoctorResolver = async (ctx, input) => {
  try {
    const { data } = input;
    const service = new CreateDoctor(new PrismaDoctorRepository(db));
    await service.run(data);
  } catch (error) {
    console.log(error);
    throw new InternalError('Error occurred');
  }
};
