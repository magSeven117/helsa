import { HttpNextResponse } from '@helsa/controller/http-next-response';
import { routeHandler } from '@helsa/controller/route-handler';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { SaveEducation } from '@helsa/engine/doctor/application/services/add-education';
import { Education } from '@helsa/engine/doctor/domain/educations';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { z } from 'zod';

const schema = z.object({
  education: z.object({
    id: z.string().optional(),
    title: z.string(),
    institution: z.string(),
    graduatedAt: z.string(),
  }),
});

export const POST = routeHandler({ name: 'save-education', schema }, async ({ params, body }) => {
  const { id } = params;
  const { education } = body;
  const service = new SaveEducation(new PrismaDoctorRepository(database));
  await service.run(id, education as unknown as Primitives<Education>);

  return HttpNextResponse.created();
});
