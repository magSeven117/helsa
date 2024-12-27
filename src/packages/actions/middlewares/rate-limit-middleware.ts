'use server';
import { logger } from '@helsa/observability/logger';
import { createRateLimiter, slidingWindow } from '@helsa/rate-limit';
import { createMiddleware } from 'next-safe-action';
import { headers } from 'next/headers';
const ratelimit = createRateLimiter({
  limiter: slidingWindow(50, '10s'),
  prefix: 'helsa',
});
export const rateLimitMiddleware = createMiddleware().define(async ({ next, clientInput, metadata }) => {
  const ip = headers().get('x-forwarded-for');

  const { success, remaining } = await ratelimit.limit(`${ip}-${metadata.name}`);

  if (!success) {
    logger.warn(`Rate limit exceeded for ${ip} on action ${metadata.name}`);
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
