import { create } from 'zustand';

export interface Message {
  id?: string;
  text: string;
  userId: string;
  appointmentId: string;
  createdAt?: string;
}

interface MessageState {
  messages: Message[];
  addMessage: (message: Message) => void;
  removeMessage: (messageId: string) => void;
  updateMessage: (messageId: string, message: Partial<Message>) => void;
  initMessages: (messages: Message[]) => void;
}

export const useMessage = create<MessageState>()((set) => ({
  messages: [],
  initMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  removeMessage: (messageId) =>
    set((state) => ({ messages: state.messages.filter((message) => message.id !== messageId) })),
  updateMessage: (messageId, message) =>
    set((state) => ({
      messages: state.messages.map((m) => (m.id === messageId ? { ...m, ...message } : m)),
    })),
}));
