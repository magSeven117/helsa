'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { UpdateDoctor } from '@helsa/engine/doctor/application/services/update-doctor';
import { Doctor } from '@helsa/engine/doctor/domain/doctor';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { z } from 'zod';

const schema = z.object({
  doctorId: z.string(),
  doctor: z.object({
    licenseMedicalNumber: z.string().optional(),
    experience: z.number().optional(),
    specialtyId: z.string().optional(),
  }),
});

export const updateDoctor = authActionClient
  .schema(schema)
  .metadata({ actionName: 'update-doctor' })
  .action(async ({ parsedInput }) => {
    const { doctorId, doctor } = parsedInput;
    const service = new UpdateDoctor(new PrismaDoctorRepository(database));
    await service.run(doctorId, doctor as unknown as Primitives<Doctor>);
  });
