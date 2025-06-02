import { client } from '@helsa/ingest';
import { createAppointmentRoom } from '@helsa/ingest/handlers/appointment/create-appointment-room';
import { notifyDoctor } from '@helsa/ingest/handlers/appointment/notify-doctor';
import { startAppointment } from '@helsa/ingest/handlers/appointment/start-appointment';
import { updateDoctorVector } from '@helsa/ingest/handlers/appointment/update-doctor-vector';
import { serve } from 'inngest/next';

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client,
  functions: [createAppointmentRoom, notifyDoctor, startAppointment, updateDoctorVector],
});
