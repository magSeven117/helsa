import { z } from 'zod';
import { withUser } from '../../../withUser';
import { database } from '@helsa/database';
import { GetDoctorPrices } from '@helsa/engine/doctor/application/services/get-doctor-prices';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { NextResponse } from 'next/server';

const schema = z.object({
  doctorId: z.string(),
});

export const GET = withUser(async ({ req }) => {
  const parsedInput = schema.parse(await req.json());
  const { doctorId } = parsedInput;
  const service = new GetDoctorPrices(new PrismaDoctorRepository(database));
  const prices = await service.run(doctorId);
  return NextResponse.json(prices, { status: 200 });
});
