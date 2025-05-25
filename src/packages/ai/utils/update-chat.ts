import { Chat } from '@helsa/engine/chat/domain/chat';
import { saveChat } from './save-chat';

export async function updateChat(chatId: string, userId: string, messages: any[], newMessages: any[]) {
  const createdAt = new Date();

  const firstMessageContent = messages?.at(0)?.content.at(0).text ?? '';
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
