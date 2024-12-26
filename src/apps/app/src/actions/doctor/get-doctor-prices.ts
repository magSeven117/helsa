'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetDoctorPrices } from '@helsa/engine/doctor/application/services/get-doctor-prices';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { z } from 'zod';

const schema = z.object({
  doctorId: z.string(),
});

export const getDoctorPrices = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'get-doctor-prices',
  })
  .action(async ({ parsedInput: { doctorId } }) => {
    const service = new GetDoctorPrices(new PrismaDoctorRepository(database));
    const prices = await service.run(doctorId);
    return prices;
  });
