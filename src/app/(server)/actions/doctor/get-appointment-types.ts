import { GetAppointmentTypes } from '@/modules/doctor/application/services/get-appointment-types';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { z } from 'zod';

const schema = z.object({
  doctorId: z.string(),
});

export const getAppointmentTypes = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'get-appointment-types',
  })
  .action(async ({ parsedInput: { doctorId } }) => {
    const service = new GetAppointmentTypes(new PrismaDoctorRepository(db));
    return service.run(doctorId);
  });
