import { routeHandler } from '@helsa/controller/route-handler';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { UpdateBiometric } from '@helsa/engine/patient/application/services/update-biometric';
import { PatientBiometric } from '@helsa/engine/patient/domain/members/biometric';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  biometric: z.object({
    height: z.number().optional(),
    organDonor: z.string().optional(),
    bloodType: z.string().optional(),
  }),
});

export const PUT = routeHandler({ name: 'update-biometric', schema }, async ({ body, params }) => {
  const { biometric } = body;
  const { id: patientId } = params;

  const service = new UpdateBiometric(new PrismaPatientRepository(database));
  await service.run(patientId, biometric as Primitives<PatientBiometric>);

  return NextResponse.json({ success: true, message: 'Biometric updated' });
});
