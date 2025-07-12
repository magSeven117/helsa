import { betterFetch } from '@better-fetch/fetch';
import { NextRequest } from 'next/server';
import { BetterSession } from '../server';

export const getMiddlewareSession = async (req: NextRequest): Promise<BetterSession | null> => {
  const { data: session } = await betterFetch<BetterSession>('/api/v1/auth/get-session', {
    baseURL: req.nextUrl.origin,
    headers: {
      cookie: req.headers.get('cookie') || '', // Forward the cookies from the request
    },
  });

  return session;
};
