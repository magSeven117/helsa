'use server';

import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { RemovePrice } from '@helsa/engine/doctor/application/services/remove-appointment-type';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { z } from 'zod';
import { getDoctor } from './get-doctor';

const schema = z.object({
  id: z.string(),
});

export const removePrice = authActionClient
  .schema(schema)
  .metadata({ actionName: 'remove-price' })
  .action(async ({ parsedInput: { id }, ctx: { user } }) => {
    const doctor = await getDoctor();
    const doctorId = doctor?.data?.id ?? null;
    if (!doctorId) {
      throw new Error('Doctor not found');
    }

    const service = new RemovePrice(new PrismaDoctorRepository(database));
    await service.run(doctorId, id);
  });
