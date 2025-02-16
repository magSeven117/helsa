'use server';
import { authActionClient } from '@helsa/actions/index';
import { database } from '@helsa/database';
import { Operator } from '@helsa/ddd/core/criteria';
import { GetOrders } from '@helsa/engine/order/application/get-orders';
import { PrismaOrderRepository } from '@helsa/engine/order/infrastructure/prisma-order-repository';
import { unstable_cache as cache } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  appointmentId: z.string(),
});

export const getAppointmentOrders = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'get-appointment-orders',
  })
  .action(async ({ parsedInput, ctx: { user } }) => {
    const service = new GetOrders(new PrismaOrderRepository(database));
    return cache(
      () => service.run([{ field: 'appointmentId', operator: Operator.EQUAL, value: parsedInput.appointmentId }]),
      ['get-appointment-orders', user.id, parsedInput.appointmentId],
      {
        tags: [`get-appointment-orders-${user.id}`],
        revalidate: 3600,
      }
    )();
  });
