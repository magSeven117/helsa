import { SYSTEM_HELSA_PROMPT } from '@/src/actions/chat/prompts';
import { updateChat } from '@/src/actions/chat/update-chat';
import { anthropic } from '@ai-sdk/anthropic';
import { convertToCoreMessages, streamText } from 'ai';
import { NextRequest } from 'next/server';
import { getUpcomingAppointments } from './tools/get-upcoming-appointments';

export async function POST(request: NextRequest) {
  const { messages, chatId, user } = await request.json();
  const coreMessages = convertToCoreMessages(messages);

  const result = streamText({
    messages: coreMessages,
    system: SYSTEM_HELSA_PROMPT,
    model: anthropic('claude-3-sonnet-20240229'),
    onFinish: async ({ response }) => updateChat(chatId, user.id, coreMessages, response.messages),
    tools: {
      getUpcomingAppointments,
    },
  });

  return result.toDataStreamResponse();
}
