import { HttpNextResponse } from '@helsa/api/http-next-response';
import { routeHandler } from '@helsa/api/route-handler';
import { database } from '@helsa/database';
import { GetPatient } from '@helsa/engine/patient/application/services/get-patient';
import { PatientNotFoundError } from '@helsa/engine/patient/domain/errors/patient-not-found-error';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
import { z } from 'zod';

export const GET = routeHandler(
  { name: 'get-patient', querySchema: z.object({ include: z.string().optional() }) },
  async ({ params, searchParams }) => {
    const service = new GetPatient(new PrismaPatientRepository(database));
    const response = await service.run(params.id, 'id', JSON.parse(searchParams.include || '{}'));
    return HttpNextResponse.json({ data: response });
  },
  (error) => {
    switch (true) {
      case error instanceof PatientNotFoundError:
        return HttpNextResponse.domainError(error, 400);
      default:
        return HttpNextResponse.internalServerError();
    }
  }
);
