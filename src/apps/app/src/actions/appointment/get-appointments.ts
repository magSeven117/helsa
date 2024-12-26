'use server';
import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { GetAppointments } from '@helsa/engine/appointment/application/get-appointments';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { z } from 'zod';
import { getDoctor } from '../doctor/get-doctor';
import { getPatient } from '../patient/get-patient';
import { Meta } from '@helsa/ddd/core/collection.';

const schema = z.object({
  start: z.string().optional(),
  end: z.string().optional(),
  states: z.array(z.string()).optional(),
  specialties: z.array(z.string()).optional(),
  types: z.array(z.string()).optional(),
  page: z.number().optional(),
  pageSize: z.number().optional(),
  sortBy: z.string().optional(),
  order: z.string().optional(),
});

export const getAppointments = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'get-appointments',
  })
  .action(async ({ parsedInput, ctx: { user } }) => {
    const role = user.role === 'DOCTOR' ? getDoctor({ userId: user.id }) : getPatient({ userId: user.id });
    const data = (await role)?.data || null;
    if (!data) {
      return { data: [], meta: {} as Meta };
    }
    const service = new GetAppointments(new PrismaAppointmentRepository(database));
    return await service.run(
      data.id,
      user.role,
      parsedInput ?? {},
      {
        page: parsedInput.page,
        pageSize: parsedInput.pageSize,
      },
      { sortBy: parsedInput.sortBy, order: parsedInput.order },
    );
  });
