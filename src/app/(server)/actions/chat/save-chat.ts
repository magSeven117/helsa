'use server';
import { Chat } from '@/modules/chat/domain/chat';
import { RedisChatRepository } from '@/modules/chat/infrastructure/redis-chat-repository';
import { client } from '@/modules/shared/infrastructure/persistence/redis/redis-client';

export async function saveChat(chat: Chat) {
  const repository = new RedisChatRepository(client);
  await repository.saveChat(chat);
}
