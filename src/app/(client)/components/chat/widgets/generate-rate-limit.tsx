import { ClientMessage } from '@/app/(server)/actions/chat/types';
import { v4 } from 'uuid';
import { BotMessage } from '../messages';

export const generateRateLimit = async (aiState: any): Promise<ClientMessage> => {
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
};
