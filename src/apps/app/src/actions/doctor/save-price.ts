'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { AddPrice } from '@helsa/engine/doctor/application/services/add-price';
import { Price } from '@helsa/engine/doctor/domain/price';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { z } from 'zod';

const schema = z.object({
  id: z.string().optional(),
  doctorId: z.string(),
  typeId: z.string(),
  amount: z.number(),
  currency: z.string(),
  duration: z.number(),
  name: z.string(),
});

export const savePrice = authActionClient
  .schema(schema)
  .metadata({ actionName: 'save-price' })
  .action(async ({ parsedInput, ctx }) => {
    const service = new AddPrice(new PrismaDoctorRepository(database));
    await service.run(parsedInput.doctorId, parsedInput as unknown as Primitives<Price>);
  });
