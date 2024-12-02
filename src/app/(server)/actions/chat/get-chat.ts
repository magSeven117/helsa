'use server';
import { Chat } from '@/modules/chat/domain/chat';
import { getSession } from '@/modules/shared/infrastructure/auth/better-auth';
import { client } from '@/modules/shared/infrastructure/persistence/redis/redis-client';

export async function getChat(id: string) {
  const session = await getSession();

  const userId = session?.user?.id;

  const chat = await client.hgetall<Chat>(`chat:${id}`);

  if (!chat || (userId && chat.userId !== userId)) {
    return null;
  }

  return chat;
}
