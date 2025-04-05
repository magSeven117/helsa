import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { UpdateHospital } from '@helsa/engine/hospital/application/services/update-hospital';
import { Hospital } from '@helsa/engine/hospital/domain/hospital';
import { PrismaHospitalRepository } from '@helsa/engine/hospital/infrastructure/prisma-hospital-repository';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { withUser } from '../../withUser';

const schema = z.object({
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

export const PUT = withUser(async ({ req, user, params }) => {
  const { hospital } = schema.parse(await req.json());
  const { id } = params;

  const service = new UpdateHospital(new PrismaHospitalRepository(database));
  await service.run(id, hospital as unknown as Primitives<Hospital>);

  return NextResponse.json(
    {
      message: 'Hospital updated successfully',
    },
    { status: 200 },
  );
});
