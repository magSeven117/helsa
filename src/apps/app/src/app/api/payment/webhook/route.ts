import { database } from '@helsa/database';
import { PayAppointment } from '@helsa/engine/appointment/application/pay-appointment';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { paymentWebhook } from '@helsa/payment/webhook';
import { revalidatePath } from 'next/cache';

export const POST = paymentWebhook({
  onOrderPaid: async (payload) => {
    if (payload.data.metadata.type !== 'appointment') return;

    const service = new PayAppointment(new PrismaAppointmentRepository(database));

    await service.run(payload.data.metadata.appointmentId as string);

    revalidatePath(`/api/appointments`);
    revalidatePath(`/api/appointments/${payload.data.metadata.appointmentId}`);

    console.log('Order paid', payload.data.metadata.appointmentId);
  },
  onSubscriptionActive: async (payload) => {},
  onSubscriptionCanceled: async (payload) => {},
  onSubscriptionRevoked: async (payload) => {},
});
