'use server';
import { SaveEducation } from '@/modules/doctor/application/services/add-education';
import { Education } from '@/modules/doctor/domain/educations';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
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
    const service = new SaveEducation(new PrismaDoctorRepository(db));
    await service.run(doctorId, education as unknown as Primitives<Education>);
  });
