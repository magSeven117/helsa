import { create } from 'zustand';

interface AssistantState {
  isOpen: boolean;
  message?: string;
  chats?: any[];
  setOpen: (message?: string) => void;
}

export const useAssistantStore = create<AssistantState>()((set) => ({
  isOpen: false,
  message: undefined,
  chats: [],
  setOpen: (message) => set((state) => ({ isOpen: !state.isOpen, message })),
  setChats: (chats: any[]) => set({ chats }),
}));
