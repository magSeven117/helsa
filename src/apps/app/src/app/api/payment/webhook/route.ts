import { paymentWebhook } from '@helsa/payment/webhook';

export const POST = paymentWebhook({
  onSubscriptionActive: async (payload) => {},
  onSubscriptionCanceled: async (payload) => {},
  onSubscriptionRevoked: async (payload) => {},
});
