import { AssistantSettings } from './assistant';
import { Chat } from './chat';

export interface ChatRepository {
  saveChat(chat: Chat): Promise<void>;
  clearChats(userId: string): Promise<void>;
  getChat(id: string): Promise<Chat | null>;
  getChats(userId: string): Promise<Chat[]>;
  getLastChat(userId: string): Promise<Chat | null>;
  saveAssistantSettings(
    settings: AssistantSettings,
    userId: string,
    params: { enabled?: boolean | undefined }
  ): Promise<void>;
  getAssistantSettings(userId: string): Promise<AssistantSettings>;
}
