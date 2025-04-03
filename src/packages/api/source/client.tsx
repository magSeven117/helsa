'use client';
import { createORPCClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import { createORPCReactQueryUtils, RouterUtils } from '@orpc/react-query';
import { RouterClient } from '@orpc/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';
import { AppRouter } from './router';
import { ServerContext } from './server';

const link = new RPCLink({
  url: 'http://localhost:3000/api/rpc',
});

type ORPCReactUtils = RouterUtils<RouterClient<AppRouter, ServerContext>>;

export const ORPCContext = createContext<ORPCReactUtils | undefined>(undefined);

export const ORPCProvider = ({ children }: { children: any }) => {
  const [client] = useState<RouterClient<AppRouter, ServerContext>>(() => createORPCClient(link));
  const [orpc] = useState(() => createORPCReactQueryUtils(client, { path: [''] }));

  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ORPCContext.Provider value={orpc}>{children}</ORPCContext.Provider>
    </QueryClientProvider>
  );
};

export function useORPC(): ORPCReactUtils {
  const orpc = useContext(ORPCContext);
  if (!orpc) {
    throw new Error('ORPCContext is not set up properly');
  }
  return orpc;
}
