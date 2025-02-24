'use server';

import { getSession } from '@helsa/auth/server';
import { client } from '@helsa/cache';
import { RedisChatRepository } from '@helsa/engine/chat/infrastructure/redis-chat-repository';

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
