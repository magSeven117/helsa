import { client as RedisClient } from '@/modules/shared/infrastructure/persistence/redis/redis-client';
import { Ratelimit } from '@upstash/ratelimit';
import { createMiddleware } from 'next-safe-action';
import { headers } from 'next/headers';

const ratelimit = new Ratelimit({
  limiter: Ratelimit.fixedWindow(10, '10s'),
  redis: RedisClient,
});

export const rateLimitMiddleware = createMiddleware().define(async ({ next, clientInput, metadata }) => {
  const ip = headers().get('x-forwarded-for');

  const { success, remaining } = await ratelimit.limit(`${ip}-${metadata.name}`);

  if (!success) {
    throw new Error('Too many requests');
  }

  return next({
    ctx: {
      ratelimit: {
        remaining,
      },
    },
  });
});
