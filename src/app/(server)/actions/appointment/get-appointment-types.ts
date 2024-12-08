'use server';
import { GetAppointmentTypes } from '@/modules/appointment/application/get-appointment-types';
import { PrismaAppointmentRepository } from '@/modules/appointment/infrastructure/persistence/prisma-appointment-repository';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { unstable_cache as cache } from 'next/cache';

export const getAppointmentTypes = authActionClient
  .metadata({
    actionName: 'get-appointment-types',
  })
  .action(async ({ ctx: { user } }) => {
    const service = new GetAppointmentTypes(new PrismaAppointmentRepository(db));

    return cache(() => service.run(), ['get-appointment-types', user.id], {
      tags: [`get-appointment-types-${user.id}`],
      revalidate: 3600,
    })();
  });
