'use server';
import { Chat } from '@/modules/chat/domain/chat';
import { client } from '@/modules/shared/infrastructure/persistence/redis/redis-client';
import { getCurrentUser } from '../user/get-current-user';

export async function getChats() {
  const userResponse = await getCurrentUser();
  const user = userResponse?.data;

  const userId = user?.id;

  try {
    const pipeline = client.pipeline();
    const chats: string[] = await client.zrange(`chat:user:${userId}`, 0, -1, {
      rev: true,
    });

    for (const chat of chats) {
      pipeline.hgetall(chat);
    }

    const results = await pipeline.exec();

    return results as Chat[];
  } catch (error) {
    return [];
  }
}
