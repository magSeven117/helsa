import { createTRPCRouter } from '../server-client';
import { appointmentRouter } from './appointment';

export const appRouter = createTRPCRouter({
  appointment: appointmentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
