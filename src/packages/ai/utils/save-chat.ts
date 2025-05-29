'use server';

import { Chat } from '@helsa/engine/chat/domain/chat';
import { RedisChatRepository } from '@helsa/engine/chat/infrastructure/redis-chat-repository';
import { client } from '@helsa/upstash/cache';

export async function saveChat(chat: Chat) {
  const repository = new RedisChatRepository(client);
  await repository.saveChat(chat);
}
