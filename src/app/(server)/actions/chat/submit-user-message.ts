'use server';
import { ChatAIProvider } from '@/app/(client)/components/chat/chat-ai-provider';
import { generateLoader } from '@/app/(client)/components/chat/widgets/generate-loader';
import { generateRateLimit } from '@/app/(client)/components/chat/widgets/generate-rate-limit';
import { generateText } from '@/app/(client)/components/chat/widgets/generate-text';
import { ChatGenerator } from '@/modules/chat/infrastructure/chat-generator';
import { client as RedisClient } from '@/modules/shared/infrastructure/persistence/redis/redis-client';
import { Ratelimit } from '@upstash/ratelimit';
import { createStreamableValue, getMutableAIState } from 'ai/rsc';
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

  const generator = new ChatGenerator();
  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;

  const result = await generator.generateMessage({
    loader: generateLoader,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
        display: null,
      })),
    ],
    text: generateText(aiState, textStream, textNode),
  });

  return {
    id: v4(),
    role: 'assistant',
    display: result.value,
  };
}
