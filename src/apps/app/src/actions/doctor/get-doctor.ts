'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetDoctor } from '@helsa/engine/doctor/application/services/get-doctor';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';

export const getDoctor = authActionClient
  .metadata({
    actionName: 'get-doctor',
  })
  .action(async ({ ctx: { user } }) => {
    const service = new GetDoctor(new PrismaDoctorRepository(database));
    const doctor = await service.run(user.id);
    if (!doctor) {
      return null;
    }
    return doctor;
  });
