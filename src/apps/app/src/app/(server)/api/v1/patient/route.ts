import { HttpNextResponse } from '@helsa/api/http-next-response';
import { routeHandler } from '@helsa/api/route-handler';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { CreatePatient } from '@helsa/engine/patient/application/services/create-patient';
import { Patient } from '@helsa/engine/patient/domain/patient';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
import { UpdateRole } from '@helsa/engine/user/application/update-role';
import { UserRoleValue } from '@helsa/engine/user/domain/user-role';
import { PrismaUserRepository } from '@helsa/engine/user/infrastructure/prisma-user-repository';
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

export const POST = routeHandler({ name: 'create-patient', schema }, async ({ body }) => {
  const { patient } = body;
  const service = new CreatePatient(new PrismaPatientRepository(database));
  const updateService = new UpdateRole(new PrismaUserRepository(database));
  await service.run(patient as unknown as Primitives<Patient>);
  await updateService.run(UserRoleValue.PATIENT, patient.userId);
  return HttpNextResponse.created();
});
