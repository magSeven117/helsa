'use server';
import { setupAnalytics } from '@helsa/analytics/server';
import { createMiddleware } from 'next-safe-action';
export const trackingMiddleware = createMiddleware().define(async ({ next, clientInput, metadata, ctx }) => {
  const { user } = ctx as any;
  const analytics = await setupAnalytics({
    userId: user.id,
    fullName: user.name,
  });
  if (metadata?.track) {
    await analytics.track(metadata.track);
  }

  return next({
    ctx: {
      analytics,
    },
  });
});
