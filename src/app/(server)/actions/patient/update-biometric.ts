import { UpdateBiometric } from '@/modules/patient/application/services/update-biometric';
import { PatientBiometric } from '@/modules/patient/domain/members/biometric';
import { PrismaPatientRepository } from '@/modules/patient/infrastructure/prisma-patient-repository';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { z } from 'zod';

const schema = z.object({
  patientId: z.string(),
  biometric: z.object({
    height: z.number().optional(),
    organDonor: z.string().optional(),
    bloodType: z.string().optional(),
  }),
});

export const updateBiometric = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'update-biometric',
  })
  .action(async ({ parsedInput: { biometric, patientId } }) => {
    const service = new UpdateBiometric(new PrismaPatientRepository(db));
    await service.run(patientId, biometric as Primitives<PatientBiometric>);
  });
