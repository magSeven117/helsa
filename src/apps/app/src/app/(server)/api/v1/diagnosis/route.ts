import { HttpNextResponse } from '@helsa/api/http-next-response';
import { routeHandler } from '@helsa/api/route-handler';
import { database } from '@helsa/database';
import { Operator } from '@helsa/ddd/core/criteria';
import { CreateDiagnosis } from '@helsa/engine/diagnostic/application/create-diagnosis';
import { GetDiagnoses } from '@helsa/engine/diagnostic/application/get-diagnoses';
import { PrismaDiagnosisRepository } from '@helsa/engine/diagnostic/infrastructure/prisma-diagnosis-repository';
import { z } from 'zod';

const schema = z.object({
  id: z.string(),
  description: z.string(),
  type: z.string(),
  patientId: z.string(),
  doctorId: z.string(),
  appointmentId: z.string(),
  pathologyId: z.string(),
});

export const POST = routeHandler({ name: 'create-diagnosis', schema }, async ({ body }) => {
  const service = new CreateDiagnosis(new PrismaDiagnosisRepository(database));
  await service.run(body);

  return HttpNextResponse.created();
});

const getSchema = z.object({
  id: z.string(),
  field: z.enum(['patientId', 'doctorId', 'appointmentId']),
});

export const GET = routeHandler({ name: 'get-diagnoses', querySchema: getSchema }, async ({ searchParams }) => {
  const criteria = { field: searchParams.field, operator: Operator.EQUAL, value: searchParams.id };
  const service = new GetDiagnoses(new PrismaDiagnosisRepository(database));
  const diagnoses = await service.run([criteria]);
  return HttpNextResponse.json({ data: diagnoses });
});
