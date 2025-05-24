import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { SaveEducation } from '@helsa/engine/doctor/application/services/add-education';
import { Education } from '@helsa/engine/doctor/domain/educations';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { routeHandler } from '../../../route-handler';

const schema = z.object({
  education: z.object({
    id: z.string().optional(),
    title: z.string(),
    institution: z.string(),
    graduatedAt: z.date(),
  }),
});

export const POST = routeHandler(async ({ params, req }) => {
  const { id } = params;
  const { education } = schema.parse(await req.json());
  const service = new SaveEducation(new PrismaDoctorRepository(database));
  await service.run(id, education as unknown as Primitives<Education>);

  return NextResponse.json(
    {
      message: 'Education saved successfully',
    },
    { status: 200 },
  );
});
