'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetUpcomingAppointment } from '@helsa/engine/appointment/application/get-upcoming-appointments';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { getDoctor } from '../doctor/get-doctor';

export const getUpcomingAppointment = authActionClient
  .metadata({
    actionName: 'get-upcoming-appointment',
  })
  .action(async ({ ctx: { user } }) => {
    const patient = await getDoctor();
    if (!patient) {
      return [];
    }
    const service = new GetUpcomingAppointment(new PrismaAppointmentRepository(database));
    const appointments = await service.run(patient.data?.id!);
    return appointments;
  });
