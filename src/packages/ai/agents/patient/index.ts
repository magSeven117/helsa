import { convertToCoreMessages, streamText } from 'ai';
import { google } from '../../index';
import { updateChat } from '../../utils/update-chat';
import { SYSTEM_HELSA_PROMPT } from './prompt';
import { getUpcomingAppointments } from './tools/get-upcoming-appointments';

export const helsaTherapist = (messages: Array<any>, user: { id: string }, chatId: string) => {
  const coreMessages = convertToCoreMessages(messages);
  const result = streamText({
    messages: coreMessages,
    system: SYSTEM_HELSA_PROMPT,
    model: google('gemini-2.0-flash'),
    onFinish: async ({ response }) => updateChat(chatId, user.id, coreMessages, response.messages),
    tools: {
      getUpcomingAppointments: getUpcomingAppointments(user.id),
    },
  });
  return result.toDataStreamResponse();
};
