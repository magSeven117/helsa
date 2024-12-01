import { UpdateDoctor } from '@/modules/doctor/application/services/update-doctor';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
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
    const service = new UpdateDoctor(new PrismaDoctorRepository(db));
    await service.run(doctorId, doctor);
  });
