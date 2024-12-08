'use server';
import { GetAppointments } from '@/modules/appointment/application/get-appointments';
import { PrismaAppointmentRepository } from '@/modules/appointment/infrastructure/persistence/prisma-appointment-repository';
import { Meta } from '@/modules/shared/domain/core/collection.';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { z } from 'zod';
import { getDoctor } from '../doctor/get-doctor';
import { getPatient } from '../patient/get-patient';

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
    const service = new GetAppointments(new PrismaAppointmentRepository(db));
    return await service.run(
      data.id,
      user.role,
      parsedInput ?? {},
      {
        page: parsedInput.page,
        pageSize: parsedInput.pageSize,
      },
      { sortBy: parsedInput.sortBy, order: parsedInput.order }
    );
  });
