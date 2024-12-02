'use server';
import { Chat } from '@/modules/chat/domain/chat';
import { client } from '@/modules/shared/infrastructure/persistence/redis/redis-client';

export async function saveChat(chat: Chat) {
  const pipeline = client.pipeline();
  pipeline.hmset(`chat:${chat.id}`, chat);

  const chatKey = `chat:user:${chat.userId}`;

  pipeline
    .zadd(chatKey, {
      score: Date.now(),
      member: `chat:${chat.id}`,
    })
    .expire(chatKey, 2592000);

  await pipeline.exec();
}
