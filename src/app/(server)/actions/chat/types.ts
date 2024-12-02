import { AssistantUser } from '@/modules/chat/domain/assistant';
import { Message } from '@/modules/chat/domain/chat';
import type { ReactNode } from 'react';

export type AIState = {
  chatId: string;
  user: AssistantUser;
  messages: Message[];
};

export type UIState = {
  id: string;
  display: React.ReactNode;
}[];

type ValueOrUpdater<T> = T | ((prevState: T) => T);

export type MutableAIState = {
  get: () => AIState;
  update: (newState: ValueOrUpdater<AIState>) => void;
  done: ((newState: AIState) => void) | (() => void);
};

export interface ClientMessage {
  id: string;
  role: 'user' | 'assistant';
  display: ReactNode;
}
