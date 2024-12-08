'use server';
import { GetDoctorPrices } from '@/modules/doctor/application/services/get-doctor-prices';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
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
    const service = new GetDoctorPrices(new PrismaDoctorRepository(db));
    const prices = await service.run(doctorId);
    return prices;
  });
