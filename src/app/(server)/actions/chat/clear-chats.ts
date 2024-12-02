'use server';

import { client } from '@/modules/shared/infrastructure/persistence/redis/redis-client';

export async function clearChats({ userId }: { teamId: string; userId: string }) {
  const chats: string[] = await client.zrange(`chat:user:${userId}`, 0, -1);

  const pipeline = client.pipeline();

  for (const chat of chats) {
    pipeline.del(chat);
    pipeline.zrem(`chat:user:${userId}`, chat);
  }

  await pipeline.exec();
}
