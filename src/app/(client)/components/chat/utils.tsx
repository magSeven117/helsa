import { Chat, Message } from '@/modules/chat/domain/chat';
import { BotMessage, UserMessage } from './messages';

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function getUIComponentFromMessage(message: Message) {
  if (message.role === 'user') {
    return <UserMessage>{message.content as any}</UserMessage>;
  }

  if (message.role === 'assistant' && typeof message.content === 'string') {
    return <BotMessage content={message.content} />;
  }
}

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState?.messages
    .filter((message) => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.id}-${index}`,
      display: getUIComponentFromMessage(message),
    }));
};
