'use server';

import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetAppointmentTypes } from '@helsa/engine/appointment/application/get-appointment-types';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { unstable_cache as cache } from 'next/cache';

export const getAppointmentTypes = authActionClient
  .metadata({
    actionName: 'get-appointment-types',
  })
  .action(async ({ ctx: { user } }) => {
    const service = new GetAppointmentTypes(new PrismaAppointmentRepository(database));

    return cache(() => service.run(), ['get-appointment-types', user.id], {
      tags: [`get-appointment-types-${user.id}`],
      revalidate: 3600,
    })();
  });
