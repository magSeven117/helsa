import { create } from 'zustand';

export interface AuthState {
  currentEmail?: string;
  setCurrentEmail: (email: string) => void;
}
export const useAuthState = create<AuthState>()((set) => ({
  currentEmail: undefined,
  setCurrentEmail: (email) => set({ currentEmail: email }),
}));
