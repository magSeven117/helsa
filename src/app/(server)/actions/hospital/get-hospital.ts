import { GetHospital } from '@/modules/hospital/application/services/get-hospital';
import { PrismaHospitalRepository } from '@/modules/hospital/infrastructure/prisma-hospital-repository';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { z } from 'zod';

const schema = z.object({
  userId: z.string(),
});

export const getHospital = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'get-hospital',
  })
  .action(async ({ parsedInput: { userId } }) => {
    const service = new GetHospital(new PrismaHospitalRepository(db));
    return await service.run(userId);
  });
