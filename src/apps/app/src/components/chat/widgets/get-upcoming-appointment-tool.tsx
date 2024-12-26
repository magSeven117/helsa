import { getUpcomingAppointment } from '@/src/actions/appointment/get-upcoming-appointment';
import { MutableAIState } from '@/src/actions/chat/types';
import { v4 } from 'uuid';
import { z } from 'zod';
import UpcomingAppointments from '../tools/upcoming-appointments';

type Args = {
  aiState: MutableAIState;
};
export function getUpcomingAppointmentTool({ aiState }: Args) {
  return {
    description: 'Get the next upcoming appointment',
    parameters: z.object({
      fromDate: z.coerce.date().describe('Filter appointment from this date, in ISO-8601 format').optional(),
    }),
    generate: async (props: any) => {
      const toolCallId = v4();
      const response = await getUpcomingAppointment();
      const appointments = response?.data ?? [];

      aiState.done({
        ...aiState.get(),
        messages: [
          ...aiState.get().messages,
          {
            id: v4(),
            role: 'assistant',
            content: [
              {
                type: 'tool-call',
                toolName: 'getUpcomingAppointment',
                toolCallId,
                args: {},
              },
            ],
          },
          {
            id: v4(),
            role: 'tool',
            content: [
              {
                type: 'tool-result',
                toolName: 'getUpcomingAppointment',
                toolCallId,
                result: { appointments },
              },
            ],
          },
        ],
      });

      return <UpcomingAppointments data={appointments} />;
    },
  };
}
