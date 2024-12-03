'use server';
import { RemoveAppointmentType } from '@/modules/doctor/application/services/remove-appointment-type';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { z } from 'zod';
import { getDoctor } from './get-doctor';

const schema = z.object({
  id: z.string(),
});

export const removeAppointmentType = authActionClient
  .schema(schema)
  .metadata({ actionName: 'remove-appointment-type' })
  .action(async ({ parsedInput: { id }, ctx: { user } }) => {
    const doctor = await getDoctor({ userId: user.id });
    const doctorId = doctor?.data?.id ?? null;
    if (!doctorId) {
      throw new Error('Doctor not found');
    }

    const service = new RemoveAppointmentType(new PrismaDoctorRepository(db));
    await service.run(doctorId, id);
  });
