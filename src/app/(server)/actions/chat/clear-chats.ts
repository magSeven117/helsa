'use server';

import { RedisChatRepository } from '@/modules/chat/infrastructure/redis-chat-repository';
import { client } from '@/modules/shared/infrastructure/persistence/redis/redis-client';

export async function clearChats({ userId }: { userId: string }) {
  const repository = new RedisChatRepository(client);
  await repository.clearChats(userId);
}
