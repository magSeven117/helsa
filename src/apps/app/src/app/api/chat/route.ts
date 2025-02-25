import { SYSTEM_HELSA_PROMPT } from '@/src/actions/chat/prompts';
import { updateChat } from '@/src/actions/chat/update-chat';
import { anthropic } from '@ai-sdk/anthropic';
import { createAzure } from '@ai-sdk/azure';
import { convertToCoreMessages, streamText } from 'ai';
import { NextRequest } from 'next/server';
import { getAvgVitalsTool } from './tools/get-avg-vitals';
import { getUpcomingAppointments } from './tools/get-upcoming-appointments';

const model = createAzure({
  resourceName: process.env.AZURE_RESOURCE_NAME!,
  apiKey: process.env.AZURE_API_KEY!,
});

export async function POST(request: NextRequest) {
  const { messages, chatId, user } = await request.json();
  const coreMessages = convertToCoreMessages(messages);

  const result = streamText({
    messages: coreMessages,
    system: SYSTEM_HELSA_PROMPT,
    model: process.env.AZURE_RESOURCE_NAME ? model('gpt-4o') : anthropic('claude-3-sonnet-20240229'),
    onFinish: async ({ response }) => updateChat(chatId, user.id, coreMessages, response.messages),
    tools: {
      getUpcomingAppointments,
      getAvgVitalsTool,
    },
  });

  return result.toDataStreamResponse();
}
