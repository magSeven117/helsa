'use server';

import { actionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { RegisterUser } from '@helsa/engine/user/application/register-user';
import { PrismaUserRepository } from '@helsa/engine/user/infrastructure/prisma-user-repository';
import { TriggerEventBus } from '@helsa/tasks';
import { z } from 'zod';

const schema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string().email(),
    role: z.string(),
    name: z.string(),
  }),
});

export const createUser = actionClient
  .schema(schema)
  .metadata({ actionName: 'create-user' })
  .action(async ({ ctx, parsedInput }) => {
    const { user } = parsedInput;
    const service = new RegisterUser(new PrismaUserRepository(database), new TriggerEventBus());
    await service.run(user.id, user.email, user.role, user.name);
  });
