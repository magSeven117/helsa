'use server';
import { authActionClient } from '@helsa/actions/index';
import { database } from '@helsa/database';
import { Operator } from '@helsa/ddd/core/criteria';
import { GetOrders } from '@helsa/engine/order/application/get-orders';
import { PrismaOrderRepository } from '@helsa/engine/order/infrastructure/prisma-order-repository';
import { unstable_cache as cache } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  patientId: z.string(),
});

export const getPatientOrders = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'get-patient-orders',
  })
  .action(async ({ parsedInput, ctx: { user } }) => {
    const service = new GetOrders(new PrismaOrderRepository(database));
    return cache(
      () => service.run([{ field: 'patientId', operator: Operator.EQUAL, value: parsedInput.patientId }]),
      ['get-patient-orders', user.id, parsedInput.patientId],
      {
        tags: [`get-patient-orders-${user.id}`],
        revalidate: 3600,
      }
    )();
  });
