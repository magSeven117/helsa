'use server';

import { GetDoctorAppointments } from '@/modules/appointment/application/get-doctor-appointments';
import { PrismaAppointmentRepository } from '@/modules/appointment/infrastructure/persistence/prisma-appointment-repository';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
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
    const service = new GetDoctorAppointments(new PrismaAppointmentRepository(db));
    const response = await service.run(doctorId);
    return response.getItems();
  });
