'use server';

import { Chat } from '@/modules/chat/domain/chat';
import { saveChat } from './save-chat';
import { AIState } from './types';

export async function updateChatState({ state, done }: { state: AIState; done: boolean }) {
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
}
