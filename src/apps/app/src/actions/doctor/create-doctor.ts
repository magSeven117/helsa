'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { CreateDoctor } from '@helsa/engine/doctor/application/services/create-doctor';
import { Doctor } from '@helsa/engine/doctor/domain/doctor';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { UpdateRole } from '@helsa/engine/user/application/update-role';
import { UserRoleValue } from '@helsa/engine/user/domain/user-role';
import { PrismaUserRepository } from '@helsa/engine/user/infrastructure/prisma-user-repository';
import { z } from 'zod';

const schema = z.object({
  doctor: z.object({
    id: z.string(),
    userId: z.string(),
    licenseMedicalNumber: z.string(),
    specialtyId: z.string(),
  }),
});

export const createDoctor = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'create-doctor',
  })
  .action(async ({ parsedInput }) => {
    const { doctor } = parsedInput;
    const service = new CreateDoctor(new PrismaDoctorRepository(database));
    const updateService = new UpdateRole(new PrismaUserRepository(database));
    await service.run(doctor as unknown as Primitives<Doctor>);
    await updateService.run(UserRoleValue.DOCTOR, doctor.userId);
  });
