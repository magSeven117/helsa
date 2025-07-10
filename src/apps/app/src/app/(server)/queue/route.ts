import { setReadyAppointment } from '@/src/events/crons/set-ready-appointment';
import { createAppointmentRoom } from '@/src/events/handlers/appointment/create-appointment-room';
import { notifyDoctor } from '@/src/events/handlers/appointment/notify-doctor';
import { startAppointment } from '@/src/events/handlers/appointment/start-appointment';
import { updateDoctorVector } from '@/src/events/handlers/appointment/update-doctor-vector';
import { client } from '@helsa/events';
import { serve } from 'inngest/next';

export const { GET, POST, PUT } = serve({
  client,
  functions: [setReadyAppointment, createAppointmentRoom, notifyDoctor, startAppointment, updateDoctorVector],
});
