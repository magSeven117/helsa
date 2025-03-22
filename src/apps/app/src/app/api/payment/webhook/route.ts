import { paymentWebhook } from '@helsa/payment/webhook';

export const POST = paymentWebhook({
  onOrderPaid: async (payload) => {
    if (payload.data.metadata.type !== 'appointment') return;

    console.log('Order paid', payload.data.metadata.appointmentId);

    /// Update appointment status
  },
  onSubscriptionActive: async (payload) => {},
  onSubscriptionCanceled: async (payload) => {},
  onSubscriptionRevoked: async (payload) => {},
});
