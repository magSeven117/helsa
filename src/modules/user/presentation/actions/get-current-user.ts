'use server';

import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { currentUser } from '@clerk/nextjs/server';
import { GetUser } from '../../application/get-user';
import { PrismaUserRepository } from '../../infrastructure/prisma-user-repository';

export const getCurrentUser = async () => {
  const externalUser = await currentUser();
  const useCase = new GetUser(new PrismaUserRepository(db));
  const user = await useCase.run(externalUser.id);
  if (!user) {
    return null;
  }
  return user;
};
