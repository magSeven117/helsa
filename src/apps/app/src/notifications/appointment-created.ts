import { render } from '@helsa/email';
import { AppointmentScheduledEmail } from '@helsa/email/templates/appointment-scheduled';
import { workflow } from '@novu/framework';
import { z } from 'zod';

export const appointmentCreatedWorkflow = workflow(
  'appointment-scheduled',
  async ({ step, payload }) => {
    await step.inApp('appointment-scheduled-in-app', async () => {
      return {
        title: `Nueva cita creada con ${payload.patient.name}`,
        body: `El paciente ${payload.patient.name} ha creado una cita para el ${payload.date} a las ${payload.time}.`,
      };
    });
    await step.email('appointment-scheduled-email', async () => {
      return {
        subject: `${payload.patient.name}, ha creado una cita contigo`,
        body: await render(AppointmentScheduledEmail(payload)),
      };
    });

    await step.push('appointment-scheduled-push', async () => {
      return {
        subject: `Nueva cita creada con ${payload.patient.name}`,
        body: `El paciente ${payload.patient.name} ha creado una cita para el ${payload.date} a las ${payload.time}.`,
      };
    });
  },
  {
    name: 'Appointment Scheduled Workflow',
    payloadSchema: z.object({
      date: z.string(),
      time: z.string(),
      patient: z.object({
        name: z.string(),
        email: z.string().email(),
      }),
      reason: z.string().optional(),
    }),
  },
);
