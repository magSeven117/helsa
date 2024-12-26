'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { CreateHospital } from '@helsa/engine/hospital/application/services/create-hospital';
import { Hospital } from '@helsa/engine/hospital/domain/hospital';
import { PrismaHospitalRepository } from '@helsa/engine/hospital/infrastructure/prisma-hospital-repository';
import { UpdateRole } from '@helsa/engine/user/application/update-role';
import { UserRoleValue } from '@helsa/engine/user/domain/user-role';
import { PrismaUserRepository } from '@helsa/engine/user/infrastructure/prisma-user-repository';

import { z } from 'zod';

const schema = z.object({
  hospital: z.object({
    adminId: z.string(),
    name: z.string(),
    address: z.object({
      street: z.string(),
      city: z.string(),
      country: z.string(),
      zipCode: z.string(),
      coordinates: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
    }),
  }),
});

export const createHospital = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'create-hospital',
  })
  .action(async ({ parsedInput: { hospital } }) => {
    const service = new CreateHospital(new PrismaHospitalRepository(database));
    const updateRol = new UpdateRole(new PrismaUserRepository(database));
    await service.run(hospital as unknown as Primitives<Hospital>);
    await updateRol.run(UserRoleValue.HOSPITAL, hospital.adminId);
  });
