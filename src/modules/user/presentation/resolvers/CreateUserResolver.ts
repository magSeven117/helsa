import { db } from '@/modules/shared/infrastructure/persistence/prisma/PrismaConnection';
import { RegisterUser } from '../../application/RegisterUser';
import { PrismaUserRepository } from '../../infrastructure/PrismaUserRepository';

export const CreateUserResolver = async (ctx, input) => {
  try {
    const { user } = input;
    const useCase = new RegisterUser(new PrismaUserRepository(db));
    await useCase.run(user.id, user.externalId, user.email, user.role);
  } catch (error) {
    console.log(error);
  }
};
