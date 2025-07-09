'use server';

import { client } from '@helsa/cache/cache';
import { Chat } from '@helsa/engine/chat/domain/chat';
import { RedisChatRepository } from '@helsa/engine/chat/infrastructure/redis-chat-repository';

export async function saveChat(chat: Chat) {
  const repository = new RedisChatRepository(client);
  await repository.saveChat(chat);
}
