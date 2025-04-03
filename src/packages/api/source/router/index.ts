import { InferRouterInputs, InferRouterOutputs } from '@orpc/server';
import { base } from '../server';
import { getAppointment } from './appointment/get-appointment';

export const apiRouter = base.router({
  appointment: base.router({
    get: getAppointment,
  }),
});

export type AppRouter = typeof apiRouter;
export type AppRouterInput = InferRouterInputs<AppRouter>;
export type AppRouterOutput = InferRouterOutputs<AppRouter>;
