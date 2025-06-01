import { render } from '@helsa/email';
import { AppointmentScheduledEmail } from '@helsa/email/templates/appointment-scheduled';
import { workflow } from '@novu/framework';
import { z } from 'zod';

export const appointmentCreatedWorkflow = workflow(
  'appointment-created-workflow',
  async ({ step, payload }) => {
    await step.email('appointment-created-email', async () => {
      return {
        subject: `${payload.patient.name}, ha creado una cita contigo`,
        body: await render(AppointmentScheduledEmail(payload)),
      };
    });
  },
  {
    name: 'Appointment Created Workflow',
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
