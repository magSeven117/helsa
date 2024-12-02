'use server';

import { AssistantSettings } from '@/modules/chat/domain/assistant';
import { client } from '@/modules/shared/infrastructure/persistence/redis/redis-client';

type SetAssistant = {
  settings: AssistantSettings;
  userId: string;
  teamId: string;
  params: {
    enabled?: boolean | undefined;
  };
};
export async function setAssistantSettings({ settings, params, userId }: SetAssistant) {
  return client.set(`assistant:user:${userId}:settings`, {
    ...settings,
    ...params,
  });
}
