import { SYSTEM_HELSA_PROMPT } from '@/src/actions/chat/prompts';
import { updateChat } from '@/src/actions/chat/update-chat';
import { deepseek } from '@ai-sdk/deepseek';
import { convertToCoreMessages, streamText } from 'ai';
import { NextRequest } from 'next/server';
import { getAvgVitalsTool } from './tools/get-avg-vitals';
import { getUpcomingAppointments } from './tools/get-upcoming-appointments';

export async function POST(request: NextRequest) {
  const { messages, chatId, user } = await request.json();
  const coreMessages = convertToCoreMessages(messages);

  const result = streamText({
    messages: coreMessages,
    system: SYSTEM_HELSA_PROMPT,
    model: deepseek('deepseek-chat'),
    onFinish: async ({ response }) => updateChat(chatId, user.id, coreMessages, response.messages),
    tools: {
      getUpcomingAppointments,
      getAvgVitalsTool,
    },
  });

  return result.toDataStreamResponse();
}
