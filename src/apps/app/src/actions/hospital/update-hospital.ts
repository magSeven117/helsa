'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { UpdateHospital } from '@helsa/engine/hospital/application/services/update-hospital';
import { Hospital } from '@helsa/engine/hospital/domain/hospital';
import { PrismaHospitalRepository } from '@helsa/engine/hospital/infrastructure/prisma-hospital-repository';
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
    const service = new UpdateHospital(new PrismaHospitalRepository(database));
    await service.run(hospitalId, hospital as unknown as Primitives<Hospital>);
  });
