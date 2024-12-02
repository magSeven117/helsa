'use server';
import { client } from '@/modules/shared/infrastructure/persistence/redis/redis-client';
import { getCurrentUser } from '../user/get-current-user';
import { getAssistantSettings } from './get-assistant-settings';

export async function getLatestChat() {
  const settings = await getAssistantSettings();
  if (!settings?.enabled) return null;

  const userResponse = await getCurrentUser();
  const user = userResponse?.data;

  const userId = user?.id;

  try {
    const chat: string[] = await client.zrange(`chat:user:${userId}`, 0, 1, {
      rev: true,
    });

    const lastId = chat.at(0);

    if (lastId) {
      return client.hgetall(lastId);
    }
  } catch (error) {
    return null;
  }
}
