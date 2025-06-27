import { HttpNextResponse } from '@helsa/controller/http-next-response';
import { routeHandler } from '@helsa/controller/route-handler';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { AddPrice } from '@helsa/engine/doctor/application/services/add-price';
import { GetDoctorPrices } from '@helsa/engine/doctor/application/services/get-doctor-prices';
import { DoctorNotFoundError } from '@helsa/engine/doctor/domain/errors/doctor-not-found-error';
import { Price } from '@helsa/engine/doctor/domain/price';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { z } from 'zod';

const schema = z.object({
  doctorId: z.string(),
});

export const GET = routeHandler({ name: 'get-doctor-prices' }, async ({ req, params }) => {
  const { id } = params;
  const service = new GetDoctorPrices(new PrismaDoctorRepository(database));
  const prices = await service.run(id);
  return HttpNextResponse.json({ data: prices });
});

const saveSchema = z.object({
  id: z.string().optional(),
  typeId: z.string(),
  amount: z.number(),
  currency: z.string(),
  duration: z.number(),
  name: z.string(),
});

export const POST = routeHandler(
  { name: 'add-price', schema: saveSchema },
  async ({ body, params }) => {
    const { id } = params;
    const service = new AddPrice(new PrismaDoctorRepository(database));
    await service.run(id, body as Primitives<Price>);
    return HttpNextResponse.created();
  },
  (error) => {
    switch (true) {
      case error instanceof DoctorNotFoundError:
        return HttpNextResponse.domainError(error, 404);
      default:
        return HttpNextResponse.internalServerError();
    }
  },
);
