'use server';

import { AssistantSettings } from '@/modules/chat/domain/assistant';
import { RedisChatRepository } from '@/modules/chat/infrastructure/redis-chat-repository';
import { client } from '@/modules/shared/infrastructure/persistence/redis/redis-client';
import { getCurrentUser } from '../user/get-current-user';

export async function getAssistantSettings(): Promise<AssistantSettings> {
  const userResponse = await getCurrentUser();

  const user = userResponse?.data;

  const userId = user?.id;

  if (!userId) {
    return {
      enabled: false,
    };
  }

  const repository = new RedisChatRepository(client);
  const settings = await repository.getAssistantSettings(userId);
  return settings;
}
