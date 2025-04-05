import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { UpdateDemographic } from '@helsa/engine/patient/application/services/update-demographic';
import { PatientDemographic } from '@helsa/engine/patient/domain/members/demographic';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
import { z } from 'zod';
import { withUser } from '../../../withUser';
import { NextResponse } from 'next/server';
const schema = z.object({
  demographic: z.object({
    civilStatus: z.string().optional(),
    occupation: z.string().optional(),
    educativeLevel: z.string().optional(),
  }),
});
export const PUT = withUser(async ({ req, params }) => {
  const { demographic } = schema.parse(await req.json());
  const { id: patientId } = params;
  const service = new UpdateDemographic(new PrismaPatientRepository(database));
  await service.run(patientId, demographic as unknown as Primitives<PatientDemographic>);

  return NextResponse.json({ success: true, message: 'Demographic updated' });
});
