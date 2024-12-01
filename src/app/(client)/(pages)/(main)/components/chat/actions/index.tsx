import { client as RedisClient } from '@/modules/shared/infrastructure/persistence/redis/redis-client';
import { anthropic } from '@ai-sdk/anthropic';
import { Ratelimit } from '@upstash/ratelimit';
import { createAI, createStreamableValue, getMutableAIState, streamUI } from 'ai/rsc';
import { headers } from 'next/headers';
import { v4 } from 'uuid';
import { BotMessage, SpinnerMessage } from '../messages';
import { saveChat } from './storage';
import { AIState, Chat, ClientMessage, UIState } from './types';

const ratelimit = new Ratelimit({
  limiter: Ratelimit.fixedWindow(10, '10s'),
  redis: RedisClient,
});

export async function submitUserMessage(content: string): Promise<ClientMessage> {
  'use server';
  const ip = headers().get('x-forwarded-for');
  const { success } = await ratelimit.limit(ip!);
  const aiState = getMutableAIState<typeof AI>();
  if (!success) {
    aiState.update({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: v4(),
          role: 'assistant',
          content: "Not so fast, tiger. You've reached your message limit. Please wait a minute and try again.",
        },
      ],
    });

    return {
      id: v4(),
      role: 'assistant',
      display: (
        <BotMessage content="Not so fast, tiger. You've reached your message limit. Please wait a minute and try again." />
      ),
    };
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

    Don't return markdown, just plain text.

    Always try to call the functions with default values, otherwise ask the user to respond with parameters.
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
    text: ({ content, done, delta }) => {
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
    tools: {},
  });

  return {
    id: v4(),
    role: 'assistant',
    display: result.value,
  };
}

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  onSetAIState: async ({ state, done }) => {
    'use server';

    const createdAt = new Date();
    const userId = state.user.id;

    const { chatId, messages } = state;

    const firstMessageContent = messages?.at(0)?.content ?? '';
    const title = typeof firstMessageContent === 'string' ? firstMessageContent.substring(0, 100) : '';

    const chat: Chat = {
      id: chatId,
      title,
      userId,
      createdAt,
      messages,
    };

    if (done) {
      await saveChat(chat);
    }
  },
});
