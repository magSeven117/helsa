import { env } from '@helsa/env';
import { WebhooksConfig } from '@polar-sh/adapter-utils';
import { Webhooks } from '@polar-sh/nextjs';

export const paymentWebhook = (hooks: Omit<WebhooksConfig, 'webhookSecret' | 'entitlements'>) =>
  Webhooks({
    webhookSecret: env.POLAR_WEBHOOK_SECRET,
    ...hooks,
  });
