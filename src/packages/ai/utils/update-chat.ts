import { Chat } from '@helsa/engine/chat/domain/chat';
import { CoreMessage } from 'ai';
import { saveChat } from './save-chat';

export async function updateChat(chatId: string, userId: string, messages: CoreMessage[], newMessages: CoreMessage[]) {
  const createdAt = new Date();

  const firstMessageContent = messages?.at(0)?.content ?? '';
  const title = typeof firstMessageContent === 'string' ? firstMessageContent.substring(0, 100) : '';
  const chat: Chat = {
    id: chatId,
    title,
    userId,
    createdAt,
    messages: [...messages, ...newMessages],
  };

  await saveChat(chat);
}
