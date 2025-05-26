import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { AddPrice } from '@helsa/engine/doctor/application/services/add-price';
import { GetDoctorPrices } from '@helsa/engine/doctor/application/services/get-doctor-prices';
import { Price } from '@helsa/engine/doctor/domain/price';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { routeHandler } from '../../../route-handler';

const schema = z.object({
  doctorId: z.string(),
});

export const GET = routeHandler(async ({ req, params }) => {
  const { id } = params;
  const service = new GetDoctorPrices(new PrismaDoctorRepository(database));
  const prices = await service.run(id);
  return NextResponse.json({ data: prices }, { status: 200 });
});

const saveSchema = z.object({
  id: z.string().optional(),
  typeId: z.string(),
  amount: z.number(),
  currency: z.string(),
  duration: z.number(),
  name: z.string(),
});

export const POST = routeHandler(async ({ req, params }) => {
  const parsedInput = saveSchema.parse(await req.json());
  const { id } = params;
  const service = new AddPrice(new PrismaDoctorRepository(database));
  await service.run(id, parsedInput as Primitives<Price>);
  return NextResponse.json({ message: 'Price saved successfully' }, { status: 200 });
});
