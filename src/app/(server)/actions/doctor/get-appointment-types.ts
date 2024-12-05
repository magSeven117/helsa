'use server';
import { GetAppointmentTypes } from '@/modules/doctor/application/services/get-appointment-types';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { unstable_cache as cache } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  doctorId: z.string(),
});

export const getAppointmentTypes = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'get-appointment-types',
  })
  .action(async ({ parsedInput: { doctorId }, ctx: { user } }) => {
    const service = new GetAppointmentTypes(new PrismaDoctorRepository(db));

    return cache(() => service.run(doctorId), ['get-appointment-types', user.id], {
      tags: [`get-appointment-types-${user.id}`],
      revalidate: 3600,
    })();
  });
