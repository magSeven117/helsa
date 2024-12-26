'use server';

import { client } from '@helsa/cache';
import { AssistantSettings } from '@helsa/engine/chat/domain/assistant';
import { RedisChatRepository } from '@helsa/engine/chat/infrastructure/redis-chat-repository';
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
