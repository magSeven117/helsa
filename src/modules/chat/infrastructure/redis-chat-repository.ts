import { Redis } from '@upstash/redis';
import { AssistantSettings } from '../domain/assistant';
import { Chat } from '../domain/chat';
import { ChatRepository } from '../domain/chat-repository';

export class RedisChatRepository implements ChatRepository {
  constructor(private client: Redis) {}

  async saveChat(chat: Chat): Promise<void> {
    const pipeline = this.client.pipeline();
    pipeline.hmset(`chat:${chat.id}`, chat);

    const chatKey = `chat:user:${chat.userId}`;

    pipeline
      .zadd(chatKey, {
        score: Date.now(),
        member: `chat:${chat.id}`,
      })
      .expire(chatKey, 2592000);

    await pipeline.exec();
  }

  async clearChats(userId: string): Promise<void> {
    const chats: string[] = await this.client.zrange(`chat:user:${userId}`, 0, -1);

    const pipeline = this.client.pipeline();

    for (const chat of chats) {
      pipeline.del(chat);
      pipeline.zrem(`chat:user:${userId}`, chat);
    }

    await pipeline.exec();
  }

  async getChat(id: string): Promise<Chat | null> {
    const chat = await this.client.hgetall<Chat>(`chat:${id}`);

    return chat;
  }

  async getChats(userId: string): Promise<Chat[]> {
    const pipeline = this.client.pipeline();
    const chats: string[] = await this.client.zrange(`chat:user:${userId}`, 0, -1, {
      rev: true,
    });

    for (const chat of chats) {
      pipeline.hgetall(chat);
    }

    const results = await pipeline.exec();

    return results as Chat[];
  }

  async getLastChat(userId: string): Promise<Chat | null> {
    const chat: string[] = await this.client.zrange(`chat:user:${userId}`, 0, 1, {
      rev: true,
    });

    const lastId = chat.at(0);

    if (lastId) {
      return this.client.hgetall(lastId);
    }
    return null;
  }

  async saveAssistantSettings(
    settings: AssistantSettings,
    userId: string,
    params: { enabled?: boolean | undefined }
  ): Promise<void> {
    await this.client.set(`assistant:user:${userId}:settings`, {
      ...settings,
      ...params,
    });
  }

  async getAssistantSettings(userId: string): Promise<AssistantSettings> {
    const defaultSettings: AssistantSettings = {
      enabled: true,
    };
    const settings = await this.client.get(`assistant:user:${userId}:settings`);
    return {
      ...defaultSettings,
      ...(settings || {}),
    };
  }
}
