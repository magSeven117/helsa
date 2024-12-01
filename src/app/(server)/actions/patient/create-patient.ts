import { CreatePatient } from '@/modules/patient/application/services/create-patient';
import { Patient } from '@/modules/patient/domain/patient';
import { PrismaPatientRepository } from '@/modules/patient/infrastructure/prisma-patient-repository';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { UpdateRole } from '@/modules/user/application/update-role';
import { UserRoleValue } from '@/modules/user/domain/user-role';
import { PrismaUserRepository } from '@/modules/user/infrastructure/prisma-user-repository';
import { z } from 'zod';

const schema = z.object({
  patient: z.object({
    userId: z.string(),
    demographic: z.object({
      civilStatus: z.string(),
      occupation: z.string(),
      educativeLevel: z.string(),
    }),
    biometric: z.object({
      height: z.number(),
      bloodType: z.string(),
      organDonor: z.string(),
    }),
  }),
});

export const createPatient = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'create-patient',
  })
  .action(async ({ parsedInput: { patient } }) => {
    const service = new CreatePatient(new PrismaPatientRepository(db));
    const updateService = new UpdateRole(new PrismaUserRepository(db));
    await service.run(patient as unknown as Primitives<Patient>);
    await updateService.run(UserRoleValue.PATIENT, patient.userId);
  });
