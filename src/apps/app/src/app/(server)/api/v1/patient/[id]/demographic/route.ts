import { HttpNextResponse } from '@helsa/controller/http-next-response';
import { routeHandler } from '@helsa/controller/route-handler';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { UpdateDemographic } from '@helsa/engine/patient/application/services/update-demographic';
import { PatientDemographic } from '@helsa/engine/patient/domain/members/demographic';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
import { z } from 'zod';
const schema = z.object({
  demographic: z.object({
    civilStatus: z.string().optional(),
    occupation: z.string().optional(),
    educativeLevel: z.string().optional(),
  }),
});
export const PUT = routeHandler({ name: 'update-demographic', schema }, async ({ body, params }) => {
  const { demographic } = body;
  const { id: patientId } = params;
  const service = new UpdateDemographic(new PrismaPatientRepository(database));
  await service.run(patientId, demographic as unknown as Primitives<PatientDemographic>);

  return HttpNextResponse.ok();
});
