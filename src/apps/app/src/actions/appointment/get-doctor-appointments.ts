'use server';

import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetDoctorAppointments } from '@helsa/engine/appointment/application/get-doctor-appointments';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { GetDoctor } from '@helsa/engine/doctor/application/services/get-doctor';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';

export const getDoctorAppointments = authActionClient
  .metadata({
    actionName: 'get-doctor-appointments',
  })
  .action(async ({ ctx: { user } }) => {
    const service = new GetDoctorAppointments(
      new PrismaAppointmentRepository(database),
      new GetDoctor(new PrismaDoctorRepository(database))
    );
    const response = await service.run(user.id, {});
    return response.data;
  });
