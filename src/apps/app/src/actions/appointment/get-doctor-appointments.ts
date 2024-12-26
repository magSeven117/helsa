'use server';

import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetDoctorAppointments } from '@helsa/engine/appointment/application/get-doctor-appointments';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { z } from 'zod';

const schema = z.object({
  doctorId: z.string(),
});

export const getDoctorAppointments = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'get-doctor-appointments',
  })
  .action(async ({ parsedInput: { doctorId } }) => {
    const service = new GetDoctorAppointments(new PrismaAppointmentRepository(database));
    const response = await service.run(doctorId);
    return response.getItems();
  });
