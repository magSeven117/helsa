'use client';

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { HandledError } from '../error';

const ErrorContext = createContext<{
  error: HandledError | undefined;
  setError: Dispatch<SetStateAction<HandledError | undefined>>;
}>({ error: undefined, setError: () => {} });

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<HandledError | undefined>(undefined);
  return <ErrorContext.Provider value={{ error, setError }}>{children}</ErrorContext.Provider>;
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};
