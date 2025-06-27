import { HttpNextResponse } from '@helsa/controller/http-next-response';
import { routeHandler } from '@helsa/controller/route-handler';
import { database } from '@helsa/database';
import { Operator } from '@helsa/ddd/core/criteria';
import { FormatError } from '@helsa/ddd/core/errors/format-error';
import { Primitives } from '@helsa/ddd/types/primitives';
import { CreateOrder } from '@helsa/engine/order/application/create-order';
import { GetOrders } from '@helsa/engine/order/application/get-orders';
import { Order } from '@helsa/engine/order/domain/order';
import { PrismaOrderRepository } from '@helsa/engine/order/infrastructure/prisma-order-repository';
import { unstable_cache as cache, revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  description: z.string(),
  id: z.string(),
  type: z.string(),
  appointmentId: z.string(),
  patientId: z.string(),
});

export const POST = routeHandler({ name: 'create-order', schema }, async ({ body, user }) => {
  const parsedInput = body;
  const service = new CreateOrder(new PrismaOrderRepository(database));

  await service.run({
    description: parsedInput.description,
    id: parsedInput.id,
    type: parsedInput.type as any,
    appointmentId: parsedInput.appointmentId,
    patientId: parsedInput.patientId,
  } as Primitives<Order>);

  revalidateTag(`get-appointment-orders-${user.id}`);
  revalidatePath(`/appointments/${parsedInput.appointmentId}`);

  return HttpNextResponse.created();
});

export const GET = routeHandler(
  {
    name: 'get-orders',
    querySchema: z.object({
      patientId: z.string().optional(),
      appointmentId: z.string().optional(),
    }),
  },
  async ({ user, searchParams }) => {
    const { patientId, appointmentId } = searchParams;

    if (!patientId || !appointmentId) {
      throw new FormatError('Either patientId or appointmentId must be provided');
    }

    const service = new GetOrders(new PrismaOrderRepository(database));
    const criteria = patientId
      ? [{ field: 'patientId', operator: Operator.EQUAL, value: patientId }]
      : [{ field: 'appointmentId', operator: Operator.EQUAL, value: appointmentId }];

    const orders = await cache(() => service.run(criteria), [`get-appointment-orders`, appointmentId || patientId], {
      tags: [`get-appointment-orders-${user.id}`],
      revalidate: 3600,
    })();
    return NextResponse.json({ data: orders }, { status: 200 });
  },
  (error) => {
    switch (true) {
      case error instanceof FormatError:
        return HttpNextResponse.domainError(error, 400);
      default:
        return HttpNextResponse.internalServerError();
    }
  },
);
