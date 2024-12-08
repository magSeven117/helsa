'use server';
import { AddPrice } from '@/modules/doctor/application/services/add-price';
import { Price } from '@/modules/doctor/domain/price';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { z } from 'zod';

const schema = z.object({
  id: z.string().optional(),
  doctorId: z.string(),
  typeId: z.string(),
  amount: z.number(),
  currency: z.string(),
  duration: z.number(),
});

export const savePrice = authActionClient
  .schema(schema)
  .metadata({ actionName: 'save-price' })
  .action(async ({ parsedInput, ctx }) => {
    const service = new AddPrice(new PrismaDoctorRepository(db));
    await service.run(parsedInput.doctorId, parsedInput as Primitives<Price>);
  });
