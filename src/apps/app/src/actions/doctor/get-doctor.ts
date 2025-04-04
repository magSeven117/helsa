'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetDoctor } from '@helsa/engine/doctor/application/services/get-doctor';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { unstable_cache as cache } from 'next/cache';

export const getDoctor = authActionClient
  .metadata({
    actionName: 'get-doctor',
  })
  .action(async ({ ctx: { user } }) => {
    const service = new GetDoctor(new PrismaDoctorRepository(database));

    return cache(() => service.run(user.id), ['doctor', user.id], {
      tags: [`doctor-${user.id}`],
      revalidate: 60 * 60,
    })();
  });
