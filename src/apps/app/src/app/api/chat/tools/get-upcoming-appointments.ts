import { getUpcomingAppointment } from '@/src/actions/appointment/get-upcoming-appointment';
import { tool } from 'ai';
import { z } from 'zod';

export const getUpcomingAppointments = tool({
  description: 'Get the next upcoming appointment',
  parameters: z.object({
    fromDate: z.coerce.date().describe('Filter appointment from this date, in ISO-8601 format').optional(),
  }),
  execute: async (props: any) => {
    const response = await getUpcomingAppointment();
    const appointments = response?.data ?? [];
    return {
      appointments,
    };
  },
});
