import { WebhooksConfig } from '@polar-sh/adapter-utils';
import { Webhooks } from '@polar-sh/nextjs';
import { keys } from './keys';

export const paymentWebhook = (hooks: Omit<WebhooksConfig, 'webhookSecret' | 'entitlements'>) =>
  Webhooks({
    webhookSecret: keys().POLAR_WEBHOOK_SECRET,
    ...hooks,
  });
