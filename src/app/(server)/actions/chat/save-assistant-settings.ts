'use server';

import { AssistantSettings } from '@/modules/chat/domain/assistant';
import { RedisChatRepository } from '@/modules/chat/infrastructure/redis-chat-repository';
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
  const repository = new RedisChatRepository(client);
  await repository.saveAssistantSettings(settings, userId, params);
}
