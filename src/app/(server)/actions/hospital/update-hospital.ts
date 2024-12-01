import { UpdateHospital } from '@/modules/hospital/application/services/update-hospital';
import { Hospital } from '@/modules/hospital/domain/hospital';
import { PrismaHospitalRepository } from '@/modules/hospital/infrastructure/prisma-hospital-repository';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { z } from 'zod';

const schema = z.object({
  hospitalId: z.string(),
  hospital: z.object({
    name: z.string().optional(),
    address: z
      .object({
        street: z.string().optional(),
        city: z.string().optional(),
        country: z.string().optional(),
        zipCode: z.string().optional(),
        coordinates: z
          .object({
            latitude: z.number(),
            longitude: z.number(),
          })
          .optional(),
      })
      .optional(),
  }),
});

export const updateHospital = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'update-hospital',
  })
  .action(async ({ parsedInput: { hospital, hospitalId } }) => {
    const service = new UpdateHospital(new PrismaHospitalRepository(db));
    await service.run(hospitalId, hospital as unknown as Primitives<Hospital>);
  });
