import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { TriggerEventBus } from '@/modules/shared/infrastructure/events/trigger/trigger-event-bus';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { RegisterUser } from '../../../application/register-user';
import { PrismaUserRepository } from '../../../infrastructure/prisma-user-repository';

export const CreateUserResolver = async (
  _: unknown,
  input: {
    user: {
      id: string;
      email: string;
      role: string;
      name: string;
    };
  }
) => {
  try {
    const { user } = input;
    const useCase = new RegisterUser(new PrismaUserRepository(db), new TriggerEventBus());
    await useCase.run(user.id, user.email, user.role, user.name);
  } catch (error) {
    console.log(error);
    throw new InternalError('Error occurred');
  }
};
