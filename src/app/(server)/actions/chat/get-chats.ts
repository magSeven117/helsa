'use server';
import { RedisChatRepository } from '@/modules/chat/infrastructure/redis-chat-repository';
import { client } from '@/modules/shared/infrastructure/persistence/redis/redis-client';
import { getCurrentUser } from '../user/get-current-user';

export async function getChats() {
  const userResponse = await getCurrentUser();
  const user = userResponse?.data;

  const userId = user?.id;

  if (!userId) {
    return [];
  }

  try {
    const repository = new RedisChatRepository(client);
    const chats = await repository.getChats(userId);
    return chats;
  } catch (error) {
    return [];
  }
}
