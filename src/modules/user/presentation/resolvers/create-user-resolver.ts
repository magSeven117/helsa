import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { QStashEventBus } from '@/modules/shared/infrastructure/events/qstash/qstash-event-bus';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { RegisterUser } from '../../application/register-user';
import { PrismaUserRepository } from '../../infrastructure/prisma-user-repository';

export const CreateUserResolver = async (ctx, input) => {
  try {
    const { user } = input;
    const useCase = new RegisterUser(new PrismaUserRepository(db), new QStashEventBus());
    await useCase.run(user.id, user.externalId, user.email, user.role, user.additionalData);
  } catch (error) {
    console.log(error);
    throw new InternalError('Error occurred');
  }
};
