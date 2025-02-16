'use server';

import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { CreateOrder } from '@helsa/engine/order/application/create-order';
import { Order } from '@helsa/engine/order/domain/order';
import { PrismaOrderRepository } from '@helsa/engine/order/infrastructure/prisma-order-repository';
import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  description: z.string(),
  id: z.string(),
  type: z.string(),
  appointmentId: z.string(),
});

export const createOrder = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'create-order',
  })
  .action(async ({ parsedInput, ctx: { user } }) => {
    const service = new CreateOrder(new PrismaOrderRepository(database));

    await service.run({
      description: parsedInput.description,
      id: parsedInput.id,
      type: parsedInput.type as any,
      appointmentId: parsedInput.appointmentId,
    } as Primitives<Order>);

    revalidateTag(`get-appointment-orders-${user.id}`);
    revalidatePath(`/appointments/${parsedInput.appointmentId}`);
  });
