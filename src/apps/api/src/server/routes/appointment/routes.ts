import { createRoute } from '@hono/zod-openapi';
import { createAppointmentSchema } from './schema';

export const createAppointmentRoute = createRoute({
  method: 'post',
  path: '/appointment',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createAppointmentSchema,
        },
      },
    },
  },
  responses: {
    203: {
      description: 'Appointment created',
    },
    400: {
      description: 'Bad request',
    },
    500: {
      description: 'Internal server error',
    },
  },
});
