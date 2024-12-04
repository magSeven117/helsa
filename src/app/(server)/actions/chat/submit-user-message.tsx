'use server';
import { ChatAIProvider } from '@/app/(client)/components/chat/chat-ai-provider';
import { BotMessage, SpinnerMessage } from '@/app/(client)/components/chat/messages';
import { generateRateLimit } from '@/app/(client)/components/chat/widgets/generate-rate-limit';
import { getUpcomingAppointmentTool } from '@/app/(client)/components/chat/widgets/get-upcoming-appointment-tool';
import { client as RedisClient } from '@/modules/shared/infrastructure/persistence/redis/redis-client';
import { anthropic } from '@ai-sdk/anthropic';
import { Ratelimit } from '@upstash/ratelimit';
import { createStreamableValue, getMutableAIState, streamUI } from 'ai/rsc';
import { headers } from 'next/headers';
import { v4 } from 'uuid';
import { ClientMessage } from './types';

const ratelimit = new Ratelimit({
  limiter: Ratelimit.fixedWindow(10, '10s'),
  redis: RedisClient,
});

export async function submitUserMessage(content: string): Promise<ClientMessage> {
  const ip = headers().get('x-forwarded-for');
  const { success } = await ratelimit.limit(ip!);
  const aiState = getMutableAIState<typeof ChatAIProvider>();
  if (!success) {
    return generateRateLimit(aiState);
  }

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: v4(),
        role: 'user',
        content,
      },
    ],
  });

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;

  const result = await streamUI({
    model: anthropic('claude-3-sonnet-20240229'),
    initial: <SpinnerMessage />,
    system: `\
    You are a helpful assistant in Helsa who can help users ask questions about their appointments, medical history, payments and schedule.
    
    If the user wants the next upcoming appointment, you can call the function \`getUpcomingAppointment()\` function.
    Don't return markdown, just plain text.

    Always try to call the functions with default values, otherwise ask the user to respond with parameters.
    Only call the function, don't respond with text.
    Current date is: ${new Date().toISOString().split('T')[0]} \n
    `,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
        display: null,
      })),
    ],
    text: ({ content, done, delta }: { content: string; done: boolean; delta: string }) => {
      if (!textStream) {
        textStream = createStreamableValue('');
        textNode = <BotMessage content={textStream.value} />;
      }

      if (done) {
        textStream.done();
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: v4(),
              role: 'assistant',
              content,
            },
          ],
        });
      } else {
        textStream.update(delta);
      }
      return textNode;
    },
    tools: {
      getUpcomingAppointment: getUpcomingAppointmentTool({ aiState }),
    },
  });

  return {
    id: v4(),
    role: 'assistant',
    display: result.value,
  };
}
