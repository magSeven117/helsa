import { CreateDoctor } from '@/modules/doctor/application/services/create-doctor';
import { Doctor } from '@/modules/doctor/domain/doctor';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { UpdateRole } from '@/modules/user/application/update-role';
import { UserRoleValue } from '@/modules/user/domain/user-role';
import { PrismaUserRepository } from '@/modules/user/infrastructure/prisma-user-repository';
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
    const service = new CreateDoctor(new PrismaDoctorRepository(db));
    const updateService = new UpdateRole(new PrismaUserRepository(db));
    await service.run(doctor as unknown as Primitives<Doctor>);
    await updateService.run(UserRoleValue.DOCTOR, doctor.userId);
  });
