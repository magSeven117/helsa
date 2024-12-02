'use server';

import { AssistantSettings } from '@/modules/chat/domain/assistant';
import { client } from '@/modules/shared/infrastructure/persistence/redis/redis-client';
import { getCurrentUser } from '../user/get-current-user';

export async function getAssistantSettings(): Promise<AssistantSettings> {
  const userResponse = await getCurrentUser();

  const user = userResponse?.data;

  const userId = user?.id;

  const defaultSettings: AssistantSettings = {
    enabled: true,
  };

  const settings = await client.get(`assistant:user:${userId}:settings`);

  return {
    ...defaultSettings,
    ...(settings || {}),
  };
}
