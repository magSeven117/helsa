import { CreateHospital } from '@/modules/hospital/application/services/create-hospital';
import { Hospital } from '@/modules/hospital/domain/hospital';
import { PrismaHospitalRepository } from '@/modules/hospital/infrastructure/prisma-hospital-repository';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { UpdateRole } from '@/modules/user/application/update-role';
import { UserRoleValue } from '@/modules/user/domain/user-role';
import { PrismaUserRepository } from '@/modules/user/infrastructure/prisma-user-repository';
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
    const service = new CreateHospital(new PrismaHospitalRepository(db));
    const updateRol = new UpdateRole(new PrismaUserRepository(db));
    await service.run(hospital as unknown as Primitives<Hospital>);
    await updateRol.run(UserRoleValue.HOSPITAL, hospital.adminId);
  });
