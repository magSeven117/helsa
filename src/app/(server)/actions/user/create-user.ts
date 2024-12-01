'use server';

import { actionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { TriggerEventBus } from '@/modules/shared/infrastructure/events/trigger/trigger-event-bus';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { RegisterUser } from '@/modules/user/application/register-user';
import { PrismaUserRepository } from '@/modules/user/infrastructure/prisma-user-repository';
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
    const service = new RegisterUser(new PrismaUserRepository(db), new TriggerEventBus());
    await service.run(user.id, user.email, user.role, user.name);
  });
