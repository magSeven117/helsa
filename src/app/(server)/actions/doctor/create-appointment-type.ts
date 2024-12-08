'use server';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { z } from 'zod';

const schema = z.object({
  id: z.string().optional(),
  name: z.string(),
  duration: z.number(),
  color: z.string(),
});

export const createAppointmentType = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'create-appointment-type',
  })
  .action(async ({ parsedInput: { color, duration, name, id }, ctx: { user } }) => {
    return {
      message: 'ok',
    };
  });
