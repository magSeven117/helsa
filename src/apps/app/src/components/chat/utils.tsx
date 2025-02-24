import { Chat, Message } from '@helsa/engine/chat/domain/chat';
import { v4 } from 'uuid';
import { MutableAIState } from '../../actions/chat/types';
import { BotMessage, UserMessage } from './messages';
import { UpcomingAppointments } from './tools/upcoming-appointments';

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function getUIComponentFromMessage(message: Message) {
  if (message.role === 'user') {
    return <UserMessage>{message.content as any}</UserMessage>;
  }

  if (message.role === 'assistant' && typeof message.content === 'string') {
    return <BotMessage content={message.content} />;
  }

  if (message.role === 'tool') {
    return message.content.map((tool: any) => {
      switch (tool.toolName) {
        case 'getUpcomingAppointment': {
          return <UpcomingAppointments data={tool.result.appointments} />;
        }

        default:
          return null;
      }
    });
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

export const addToolMessage = (
  aiState: MutableAIState,
  toolName: string,
  toolCallId: string,
  args: any,
  result: any
) => {
  aiState.done({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: v4(),
        role: 'assistant',
        content: [
          {
            type: 'tool-call',
            toolName,
            toolCallId,
            args,
          },
        ],
      },
      {
        id: v4(),
        role: 'tool',
        content: [
          {
            type: 'tool-result',
            toolName,
            toolCallId,
            result,
          },
        ],
      },
    ],
  });
};
