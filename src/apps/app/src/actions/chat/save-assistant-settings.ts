'use server';

import { client } from '@helsa/cache/src';
import { AssistantSettings } from '@helsa/engine/chat/domain/assistant';
import { RedisChatRepository } from '@helsa/engine/chat/infrastructure/redis-chat-repository';

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
