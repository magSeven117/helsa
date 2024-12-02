'use server';
import { RedisChatRepository } from '@/modules/chat/infrastructure/redis-chat-repository';
import { getSession } from '@/modules/shared/infrastructure/auth/better-auth';
import { client } from '@/modules/shared/infrastructure/persistence/redis/redis-client';

export async function getChat(id: string) {
  const session = await getSession();

  const userId = session?.user?.id;

  const repository = new RedisChatRepository(client);
  const chat = await repository.getChat(id);

  if (!chat || (userId && chat.userId !== userId)) {
    return null;
  }

  return chat;
}
