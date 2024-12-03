'use server';
import { SaveAppointmentType } from '@/modules/doctor/application/services/save-appointment-type';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { z } from 'zod';
import { getDoctor } from './get-doctor';

const schema = z.object({
  name: z.string(),
  duration: z.number(),
  color: z.string(),
});

export const createAppointmentType = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'create-appointment-type',
  })
  .action(async ({ parsedInput: { color, duration, name }, ctx: { user } }) => {
    const doctor = await getDoctor({ userId: user.id });
    const doctorId = doctor?.data?.id ?? null;
    if (!doctorId) {
      throw new Error('Doctor not found');
    }
    const service = new SaveAppointmentType(new PrismaDoctorRepository(db));
    await service.run(doctorId, name, duration, color);
  });
