'use server';

import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetAvgTelemetryService } from '@helsa/engine/patient/application/services/get-avg-telemetry';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';

export const getAvgVitals = authActionClient
  .metadata({
    actionName: 'get-avg-vitals',
  })
  .action(async ({ ctx: { user } }) => {
    const service = new GetAvgTelemetryService(new PrismaPatientRepository(database));
    const avg = await service.run(user.id);
    return avg;
  });
