'use server';

import { client } from '@helsa/cache';
import { RedisChatRepository } from '@helsa/engine/chat/infrastructure/redis-chat-repository';

export async function clearChats({ userId }: { userId: string }) {
  const repository = new RedisChatRepository(client);
  await repository.clearChats(userId);
}
