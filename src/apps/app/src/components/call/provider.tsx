'use client';

import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import { CallStore, createCallStore } from './store';

export type CallStoreApi = ReturnType<typeof createCallStore>;

export const CallStoreContext = createContext<CallStoreApi | undefined>(undefined);

export const CallProvider = ({ children }: { children: React.ReactNode }) => {
  const callStoreRef = useRef<CallStoreApi>(null);

  if (!callStoreRef.current) {
    callStoreRef.current = createCallStore();
  }

  return <CallStoreContext.Provider value={callStoreRef.current}>{children}</CallStoreContext.Provider>;
};

export const useCallStore = <T,>(selector: (store: CallStore) => T): T => {
  const callStore = useContext(CallStoreContext);

  if (!callStore) {
    throw new Error('useCallStore must be used within a CallProvider');
  }

  return useStore(callStore, selector);
};
