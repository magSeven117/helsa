'use server';

import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { UpdateBiometric } from '@helsa/engine/patient/application/services/update-biometric';
import { PatientBiometric } from '@helsa/engine/patient/domain/members/biometric';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
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
    const service = new UpdateBiometric(new PrismaPatientRepository(database));
    await service.run(patientId, biometric as Primitives<PatientBiometric>);
  });
