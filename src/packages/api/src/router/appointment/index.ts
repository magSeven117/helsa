import { createTRPCRouter } from '../../server-client';
import { getAppointment } from './get-appointment';

export const appointmentRouter = createTRPCRouter({
  getAppointment,
});
