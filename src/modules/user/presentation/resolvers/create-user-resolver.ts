import { InternalError } from '@/modules/shared/domain/core/errors/InternalError';
import { QStashEventBus } from '@/modules/shared/infrastructure/events/qstash/qstash-event-bus';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/PrismaConnection';
import { RegisterUser } from '../../application/register-user';
import { PrismaUserRepository } from '../../infrastructure/PrismaUserRepository';

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
