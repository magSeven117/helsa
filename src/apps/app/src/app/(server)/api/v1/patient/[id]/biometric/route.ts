import { z } from 'zod';
import { routeHandler } from '../../../route-handler';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { UpdateBiometric } from '@helsa/engine/patient/application/services/update-biometric';
import { PatientBiometric } from '@helsa/engine/patient/domain/members/biometric';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
import { NextResponse } from 'next/server';

const schema = z.object({
  biometric: z.object({
    height: z.number().optional(),
    organDonor: z.string().optional(),
    bloodType: z.string().optional(),
  }),
});

export const PUT = routeHandler(async ({ req, params }) => {
  const { biometric } = schema.parse(await req.json());
  const { id: patientId } = params;

  // Assuming you have a service to handle the update logic
  const service = new UpdateBiometric(new PrismaPatientRepository(database));
  await service.run(patientId, biometric as Primitives<PatientBiometric>);

  return NextResponse.json({ success: true, message: 'Biometric updated' });
});
