import { updateChat } from '@/src/actions/update-chat';
import { google } from '@helsa/ai';
import { convertToCoreMessages, streamText } from 'ai';
import { format } from 'date-fns';
import { SYSTEM_HELSA_PROMPT } from './prompt';
import { getDoctors } from './tools/get-doctors';
import { getUpcomingAppointments } from './tools/get-upcoming-appointments';
import { makeAppointment } from './tools/make-appoint';

export const helsaTherapist = (messages: Array<any>, user: { id: string }, chatId: string) => {
  const coreMessages = convertToCoreMessages(messages);
  const prompt = `
    ${SYSTEM_HELSA_PROMPT}
    Current date is: ${new Date().toISOString().split('T')[0]}
    and today is ${format(new Date(), 'EEEE')}.
  `;
  const result = streamText({
    messages: coreMessages,
    system: prompt,
    model: google('gemini-2.0-flash'),
    onFinish: async ({ response }) => updateChat(chatId, user.id, coreMessages, response.messages),
    tools: {
      getUpcomingAppointments: getUpcomingAppointments(user.id),
      getDoctors: getDoctors(),
      makeAppointment: makeAppointment(user),
    },
    maxSteps: 10,
    onError: async (error) => {
      console.error('Error in helsaTherapist:', error);
    },
  });
  console.log(result);
  return result.toDataStreamResponse();
};
