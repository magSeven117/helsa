'use client';
import { BetterUser } from '@helsa/auth/server';
import React, { createContext } from 'react';

const SessionContext = createContext<{ user: BetterUser } | undefined>(undefined);

export const SessionProvider = ({ children, user }: { children: React.ReactNode; user: BetterUser }) => {
  return <SessionContext.Provider value={{ user }}>{children}</SessionContext.Provider>;
};
export const useSession = () => {
  const context = React.useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
