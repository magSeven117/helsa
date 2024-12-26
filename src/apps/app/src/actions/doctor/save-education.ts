'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { SaveEducation } from '@helsa/engine/doctor/application/services/add-education';
import { Education } from '@helsa/engine/doctor/domain/educations';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { z } from 'zod';

const schema = z.object({
  doctorId: z.string(),
  education: z.object({
    id: z.string().optional(),
    title: z.string(),
    institution: z.string(),
    graduatedAt: z.date(),
  }),
});

export const saveEducation = authActionClient
  .schema(schema)
  .metadata({ actionName: 'save-education' })
  .action(async ({ parsedInput }) => {
    const { doctorId, education } = parsedInput;
    const service = new SaveEducation(new PrismaDoctorRepository(database));
    await service.run(doctorId, education as unknown as Primitives<Education>);
  });
